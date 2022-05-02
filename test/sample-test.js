const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

let RegisterFactory, registerFactory;

describe("RegisterFactory (proxy)", async function () {
  it("Should deploy factory and and crate register", async function () {
    RegisterFactory = await ethers.getContractFactory("RegisterFactory");
    registerFactory = await upgrades.deployProxy(
      RegisterFactory,
      ["0x9d2f3c14a8525a6f07f448802cd790aa98290746"],
      {
        initializer: "createRegister",
      }
    );

    console.log(`created register is @ ${await registerFactory.registers(0)}`);

    
  });
});
