const hre = require("hardhat");

async function main() {

  const OnChainNftNew = await hre.ethers.getContractFactory("OnChainNftNew");
  const onChaninNftNew = await OnChainNftNew.deploy();

  await onChaninNftNew.deployed();

  console.log("Contract address:", onChaninNftNew.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
