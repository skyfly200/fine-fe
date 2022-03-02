const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FineCore", function () {
  it("Should return the FINE treasury address", async function () {
    const FineCore = await ethers.getContractFactory("FineCore");
    const core = await FineCore.deploy("0x7A832c86002323a5de3a317b3281Eb88EC3b2C00");
    await core.deployed();

    expect(await core.FINE_TREASURY()).to.equal("0x7A832c86002323a5de3a317b3281Eb88EC3b2C00");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});