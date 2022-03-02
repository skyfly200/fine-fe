const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FineCore", function () {
  before(async function () {
    this.FineCore = await ethers.getContractFactory("FineCore");
  });

  beforeEach(async function () {
    this.core = await this.FineCore.deploy("0x7A832c86002323a5de3a317b3281Eb88EC3b2C00");
    await this.core.deployed();
  });

  it("Should return the FINE treasury address", async function () {
    expect(await this.core.FINE_TREASURY()).to.equal("0x7A832c86002323a5de3a317b3281Eb88EC3b2C00");
  });

  it("Should return the platformPercentage", async function () {
    expect(await this.core.platformPercentage()).to.equal("1000");
  });

  it("Should return the platformRoyalty", async function () {
    expect(await this.core.platformRoyalty()).to.equal("3333");
  });
});