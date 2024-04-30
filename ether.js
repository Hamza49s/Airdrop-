const { ethers } = require("ethers");
const airdropABI = require("./airdropABI.json"); // Import the ABI

// Provider setup
const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/Jj_luMlU_qU-AE5UHvF9pngQFbw6s8wm');

// Contract setup
const contractABI = airdropABI; // Use the imported ABI
const contractAddress = 'c359eec1563db748a9681cfbd2ba2408b28188f52d2cab9f23b688ebf688e47a';
const signer = provider.getSigner();
const airdropContract = new ethers.Contract(contractAddress, contractABI, signer);

// Read Methods
async function getAdmin() {
    return await airdropContract.admin();
}

async function getTokenAddress() {
    return await airdropContract.token();
}

async function getContractBalance() {
    const balance = await provider.getBalance(contractAddress);
    return ethers.utils.formatEther(balance);
}

// Write Methods
async function performAirdrop(recipients, amounts) {
    const admin = await getAdmin();
    const currentSigner = await signer.getAddress();
    if (currentSigner != admin) {
        console.error("Only admin can perform airdrop");
        return;
    }
    await airdropContract.drop(recipients, amounts);
}

async function withdrawTokens() {
    const admin = await getAdmin();
    const currentSigner = await signer.getAddress();
    if (currentSigner != admin) {
        console.error("Only admin can withdraw tokens");
        return;
    }
    await airdropContract.withdrawTokens();
}

async function main(){
    const res = await getAdmin();
    console.log("Admin: ", res);

    const token = await getTokenAddress();
    console.log("Token Address: ", token);

    const balance = await getContractBalance();
    console.log("Contract Balance: ", balance);
}

main();
