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

//   it("Should return the FINE treasury address", async function () {
//     expect(await this.core.FINE_TREASURY()).to.equal("0x7A832c86002323a5de3a317b3281Eb88EC3b2C00");
//   });

//   it("Should return the platformPercentage", async function () {
//     expect(await this.core.platformPercentage()).to.equal("1000");
//   });

//   it("Should return the platformRoyalty", async function () {
//     expect(await this.core.platformRoyalty()).to.equal("3333");
//   });
});