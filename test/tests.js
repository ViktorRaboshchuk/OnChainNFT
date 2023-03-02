const { expect } = require("chai");
const { ethers, network } = require("hardhat");


describe("OnChainNft contract", function () {
  let onChainNftContract;
  let onChainNft;
  let owner;
  let contract_owner;
  let signer1;
  let provider;

  beforeEach(async () => {
    [owner, signer1] = await ethers.getSigners();
    onChainNftContract = await ethers.getContractFactory("OnChainNft");
    onChainNft = await onChainNftContract.deploy();
    await onChainNft.deployed();
  });

  describe("Mint", () => {
    it("Check nft ownership", async function() {
      await onChainNft.connect(signer1).mint();
      expect(await onChainNft.connect(signer1).ownerOf(1)).to.equal(signer1.address);
   });
  });

  describe("Train", () => {
   it("reverts with unexisting token", async function() {
      await expect(onChainNft.connect(signer1).train(1)).to.be.revertedWith("Please use an existing token");
   });

   it("reverts not owner", async function() {
     await onChainNft.connect(signer1).mint();
     await expect(onChainNft.connect(owner).train(1)).to.be.revertedWith("You must own this token to train it");
   });

   it("training", async function() {
     await onChainNft.connect(signer1).mint();
     await expect(onChainNft.connect(signer1).train(1));
     expect(await  onChainNft.connect(signer1).tokenIdToLevels(1)).to.equal(1);
   });
  });

});
