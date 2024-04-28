const { ethers } = require("ethers");

async function deployAndVerify() {
    // Connect to Ethereum network
    const providerUrl = "https://eth-sepolia.g.alchemy.com/v2/Jj_luMlU_qU-AE5UHvF9pngQFbw6s8wm";
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    // Set up the signer (wallet) for deploying the contract
    const privateKey = "c359eec1563db748a9681cfbd2ba2408b28188f52d2cab9f23b688ebf688e47a";
    const wallet = new ethers.Wallet(privateKey, provider);

    // Load the compiled contract ABI and bytecode
    const Airdrop = require("../artifacts/contracts/Airdrop.sol/Airdrop.json");
    const abi = Airdrop.abi;
    const bytecode = Airdrop.bytecode;

    // Deploy the contract
    console.log("Deploying Contract...");
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy("0x56eC1BDD1DCF9E5cfA8D8A37C21a4CD806c133D4"); // Pass the address of the ERC20 token contract
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);

    // Wait for some time for the contract to be deployed before verifying
    await new Promise(resolve => setTimeout(resolve, 15000));

    // Verify the contract
    // Implement the verification logic here
}

deployAndVerify().catch((err) => console.error(err));
