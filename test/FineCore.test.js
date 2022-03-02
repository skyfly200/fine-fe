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

  // it("Should return the FINE treasury address", async function () {
  //   // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

  //   // // wait until the transaction is mined
  //   // await setGreetingTx.wait();

  //   // expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });
});