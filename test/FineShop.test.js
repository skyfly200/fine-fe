const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FineShop", function () {
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
    await this.nft.initPool(0,500);
    await this.nft.initPool(500,1000);
  });

  it("Should be able to add the project to core", async function () {
    await this.core.addProject(this.nft.address);
    expect(await this.core.getProjectAddress(0)).to.equal(this.nft.address);
  });

  it("Should be able to init project", async function () {
    await this.core.addProject(this.nft.address);
    const [owner] = await ethers.getSigners();
    await this.shop.quickInit(0, owner.address, true, 0, 0);
    expect(await this.shop.projectOwner(0)).to.equal(owner.address);
    expect(await this.shop.contractFilterProject(0)).to.equal(true);
    expect(await this.shop.projectBulkMintCount(0)).to.equal(0);
    expect(await this.shop.projectMintLimit(0)).to.equal(0);
  });

  it("Should be able to setup project", async function () {
    await this.core.addProject(this.nft.address);
    const [owner] = await ethers.getSigners();
    await this.shop.quickInit(0, owner.address, true, 0, 0);
    await this.shop.quickSet(0, "ETH", "0x0000000000000000000000000000000000000000", 10000, 1, 10);
    expect(await this.shop.projectCurrencySymbol(0)).to.equal("ETH");
    expect(await this.shop.projectCurrencyAddress(0)).to.equal("0x0000000000000000000000000000000000000000");
    expect(await this.shop.projectPrice(0)).to.equal(10000);
    expect(await this.shop.projectPremintAllocation(0)).to.equal(1);
    expect(await this.shop.projectAllowListAllocation(0)).to.equal(10);
  });

  it("Should be able to go live", async function () {
    await this.core.addProject(this.nft.address);
    const [owner] = await ethers.getSigners();
    await this.shop.quickInit(0, owner.address, true, 0, 0);
    await this.shop.quickSet(0, "ETH", "0x0000000000000000000000000000000000000000", 10000, 1, 10);
    await this.shop.goLive(0);
    expect(await this.shop.projectLive(0)).to.equal(true);
    expect(await this.shop.projectPause(0)).to.equal(true);
  });

  it("Should be able to unpause", async function () {
    await this.core.addProject(this.nft.address);
    const [owner] = await ethers.getSigners();
    await this.shop.setOwner(0, owner.address);
    await this.shop.unpause(0);
    expect(await this.shop.projectPause(0)).to.equal(false);
  });

  it("Should be able to add address to allowlist", async function () {
    await this.core.addProject(this.nft.address);
    const [owner] = await ethers.getSigners();
    await this.shop.setOwner(0, owner.address);
    await this.shop.addToAllowlist(0, owner.address);
    expect(await this.shop.projectAllowList(0, owner.address)).to.equal(true);
  });

  it("Should be able to revoke address in allowlist", async function () {
    await this.core.addProject(this.nft.address);
    const [owner] = await ethers.getSigners();
    await this.shop.setOwner(0, owner.address);
    await this.shop.removeFromAllowlist(0, owner.address);
    expect(await this.shop.projectAllowList(0, owner.address)).to.equal(false);
  });

  it("Should be able to premint", async function () {
    await this.core.addProject(this.nft.address);
    const [owner] = await ethers.getSigners();
    await this.shop.quickInit(0, owner.address, true, 0, 0);
    await this.shop.quickSet(0, "ETH", "0x0000000000000000000000000000000000000000", 10000, 1, 10);
    await this.shop.goLive(0);
    await this.shop.premint(0);
    expect(await this.nft.totalSupply(0)).to.equal(1);
  });

  it("Should be able to premint and allowlist mint", async function () {
    await this.core.addProject(this.nft.address);
    const [owner] = await ethers.getSigners();
    await this.shop.quickInit(0, owner.address, true, 0, 0);
    await this.shop.quickSet(0, "ETH", "0x0000000000000000000000000000000000000000", 10000, 1, 10);
    await this.shop.goLive(0);
    await this.shop.premint(0);
    expect(await this.nft.totalSupply(0)).to.equal(1);
  });
});