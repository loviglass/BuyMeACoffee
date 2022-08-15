// scripts/update-address.js

const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

const contractAddress="0x49570EB347228228Ee9b725c95a8F80d58d43b2F";
const contractABI = abi.abi;

// Get the node connection and wallet connection.
const provider = new hre.ethers.providers.AlchemyProvider("goerli", process.env.GOERLI_API_KEY);

// Ensure that signer is the SAME address as the original contract deployer,
// or else this script will fail with an error.
const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Instantiate connected contract.
const buyMeACoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);

async function getCurrentAddress() {
  console.log("current withdraws address: ", await buyMeACoffee.payee());
}

async function main() {
  // Check current withdraws address
  await getCurrentAddress();
  // Update withdraws address
  const newAddress = "0x46aB0E888c1C4F9f3043d3e2558D9819d1f49b84";
  await buyMeACoffee.connect(signer).updateTheWithdrawalAddress(newAddress);
  console.log("updated!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

