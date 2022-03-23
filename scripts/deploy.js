async function main() {
    // We get the contract to deploy
    this.RandomStub = await ethers.getContractFactory("RandomStub");
    this.FineCore = await ethers.getContractFactory("FineCore");
    this.FineShop = await ethers.getContractFactory("FineShop");
    this.Solids = await ethers.getContractFactory("Solids");

    this.random = await this.RandomStub.deploy();
    await this.random.deployed();
    this.core = await this.FineCore.deploy(this.random.address);
    await this.core.deployed();
    this.shop = await this.FineShop.deploy(this.core.address);
    await this.shop.deployed();
    this.solids = await this.Solids.deploy(this.core.address, this.shop.address);
    await this.solids.deployed();

    console.log("RandomStub deployed to:", this.random.address);
    console.log("Core:", this.core.address);
    console.log("Shop:", this.shop.address);
    console.log("Solids:", this.solids.address);

    console.log(await hre.run("verify:verify", {
      address: this.random.address
    }));

    // await hre.run("verify:verify", {
    //   address: this.core.address,
    //   constructorArguments: [
    //     this.random.address
    //   ],
    // });

    // await hre.run("verify:verify", {
    //   address: this.shop.address,
    //   constructorArguments: [
    //     this.core.address
    //   ],
    // });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });