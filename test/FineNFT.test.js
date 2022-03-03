const { expect } = require("chai");
const { ethers } = require("hardhat");

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

  it("Should be able to add the project to core", async function () {
    await this.core.addProject(this.nft.address);
    expect(await this.core.getProjectAddress(0)).to.equal(this.nft.address);
  });

  it("Should be able to init project", async function () {
    await this.core.addProject(this.nft.address);
    const [owner] = await ethers.getSigners();
    await this.shop.quickInit(0, owner.address, true, 0, 0);
    expect(await this.shop.projectOwner(0)).to.equal(owner.address);
  });
});