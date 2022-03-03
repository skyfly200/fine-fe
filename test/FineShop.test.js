const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FineNFT", function () {
  before(async function () {
    this.RandomStub = await ethers.getContractFactory("RandomStub");
    this.FineCore = await ethers.getContractFactory("FineCore");
    this.FineShop = await ethers.getContractFactory("FineShop");
  });

  beforeEach(async function () {
    this.random = await this.RandomStub.deploy();
    await this.random.deployed();
    this.core = await this.FineCore.deploy(this.random.address);
    await this.core.deployed();
    this.shop = await this.FineShop.deploy(this.core.address);
    await this.shop.deployed();
  });

  // it("Should be able to add the project to core", async function () {
  //   await this.core.addProject(this.nft.address);
  //   console.log(await this.nft.projectId());
  //   //expect().to.equal("0x7A832c86002323a5de3a317b3281Eb88EC3b2C00");
  // });
});