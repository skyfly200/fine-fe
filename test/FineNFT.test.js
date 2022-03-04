const { expect } = require("chai");
const { ethers } = require("hardhat");
const { waffle } = require("hardhat");
const provider = waffle.provider;

describe("FineNFT", function () {
  before(async function () {
    this.RandomStub = await ethers.getContractFactory("RandomStub");
    this.FineCore = await ethers.getContractFactory("FineCore");
    this.FineShop = await ethers.getContractFactory("FineShop");
    this.FineNFT = await ethers.getContractFactory("FineNFT");
  });

  beforeEach(async function () {
    this.random = await this.RandomStub.deploy();
    await this.random.deployed();
    this.core = await this.FineCore.deploy(this.random.address);
    await this.core.deployed();
    this.shop = await this.FineShop.deploy(this.core.address);
    await this.shop.deployed();
    this.nft = await this.FineNFT.deploy(this.core.address, this.shop.address);
    await this.nft.deployed();
  });

  it("Should be able to init the art id pool", async function () {
    await this.nft.initPool(0,500);
    await this.nft.initPool(500,1000);
    expect(await this.nft.checkPool()).to.equal("1000");
  });

  it("DEFAULT_ADMIN_ROLE can setBaseURI", async function () {
    await this.nft.setBaseURI("test");
    expect(await this.nft.baseURI()).to.equal("test");
  });

  it("DEFAULT_ADMIN_ROLE can set scripts", async function () {
    await this.nft.setScript(0,"test");
    expect(await this.nft.scripts(0)).to.equal("test");
  });

  it("DEFAULT_ADMIN_ROLE can description", async function () {
    await this.nft.setDescription("test");
    expect(await this.nft.description()).to.equal("test");
  });

  it("DEFAULT_ADMIN_ROLE can website", async function () {
    await this.nft.setWebsite("test");
    expect(await this.nft.website()).to.equal("test");
  });

  it("mint fails without MINTER_ROLE", async function () {
    const [owner] = await ethers.getSigners();
    await expect(this.nft.mint(owner)).to.be.reverted;
  });

  it("can mint from MINTER_ROLE", async function () {
    const [owner] = await ethers.getSigners();
    await this.nft.initPool(0,500);
    await this.nft.initPool(500,1000);
    await this.core.addProject(this.nft.address);
    await this.nft.grantRole((await this.nft.MINTER_ROLE()), owner.address);
    let minted = await this.nft.mint(owner.address);
    expect(minted.value).to.equal(0);
  });

  it("tokenURI returns baseURI + artwork ID", async function () {
    const [owner] = await ethers.getSigners();
    await this.nft.initPool(0,500);
    await this.nft.initPool(500,1000);
    await this.core.addProject(this.nft.address);
    await this.nft.grantRole((await this.nft.MINTER_ROLE()), owner.address);
    await this.nft.setBaseURI("test");
    let minted = await this.nft.mint(owner.address);
    let art = await this.nft.artworkId(minted.value);
    let tokenURI = await this.nft.tokenURI(minted.value);
    expect(tokenURI).to.equal("test" + art);
  });

  it("contract can receive eth", async function () {
    const [owner] = await ethers.getSigners();
    await owner.sendTransaction({to: this.nft.address, value: 200});
    expect(await provider.getBalance(this.nft.address)).to.equal(200);
  });

  it("DEFAULT_ADMIN_ROLE can withdraw (split payments)", async function () {
    const [owner] = await ethers.getSigners();
    await owner.sendTransaction({to: this.nft.address, value: 300});
    expect(await provider.getBalance(this.nft.address)).to.equal(300);
    await this.nft.withdraw();
    expect(await provider.getBalance(this.nft.address)).to.equal(0);
    expect(await provider.getBalance(this.nft.artistAddress())).to.equal(200);
    expect(await provider.getBalance(this.core.FINE_TREASURY())).to.equal(100);
  });

});