const { ethers } = require("ethers");

async function deployAndVerify() {
    // Connect to Ethereum network
    const providerUrl = "";
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    // Set up the signer (wallet) for deploying the contract
    const privateKey = "";
    const wallet = new ethers.Wallet(privateKey, provider);

    // Load the compiled contract ABI and bytecode
    const Airdrop = require("../artifacts/contracts/Airdrop.sol/Airdrop.json");
    const abi = Airdrop.abi;
    const bytecode = Airdrop.bytecode;

    // Deploy the contract
    console.log("Deploying Contract...");
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy(""); // Pass the address of the ERC20 token contract
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);

    // Wait for some time for the contract to be deployed before verifying
    await new Promise(resolve => setTimeout(resolve, 15000));

    // Verify the contract
    // Implement the verification logic here
}

deployAndVerify().catch((err) => console.error(err));
