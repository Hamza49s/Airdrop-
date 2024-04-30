const { ethers } = require("ethers");
const airdropABI = require("./utils/airdropABI.json");

async function main() {
    // Provider setup
    const provider = new ethers.providers.JsonRpcProvider('');

    // Get a signer
    const signer = new ethers.Wallet('', provider);

    // Contract setup
    const contractABI = airdropABI;
    const contractAddress = '';
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

    const res = await getAdmin();
    console.log("Admin: ", res);

    const token = await getTokenAddress();
    console.log("Token Address: ", token);

    const balance = await getContractBalance();
    console.log("Contract Balance: ", balance);
}

main().catch(error => {
    console.error("Error:", error);
});
