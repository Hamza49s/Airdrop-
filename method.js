
// const contractABI = require("./utils/airdropABI.json");
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('');

const web3 = new Web3(provider);

const contractABI = [ [{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"drop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]];
const contractAddress = ''; 

const airdropContract = new web3.eth.Contract(contractABI, contractAddress);

// Read Methods
async function getAdmin() {
    return await airdropContract.methods.admin().call();
}

async function getTokenAddress() {
    return await airdropContract.methods.token().call();
}

async function getContractBalance() {
    return await web3.eth.getBalance(contractAddress);
}

// Write Methods
async function performAirdrop(recipients, amounts) {
    const accounts = await web3.eth.getAccounts();
    const admin = await getAdmin();
    if (accounts[0] !== admin) {
        console.error("Only admin can perform airdrop");
        return;
    }
    await airdropContract.methods.drop(recipients, amounts).send({ from: admin });
}

async function withdrawTokens() {
    const accounts = await web3.eth.getAccounts();
    const admin = await getAdmin();
    if (accounts[0] !== admin) {
        console.error("Only admin can withdraw tokens");
        return;
    }
    await airdropContract.methods.withdrawTokens().send({ from: admin });
}
// getAdmin().then(admin => console.log("Admin: ", admin));
// getTokenAddress().then(token => console.log("Token Address: ", token));
// getContractBalance().then(balance => console.log("Contract Balance: ", balance));


async function main(){

    const res = await getAdmin();
    console.log("Admin: ", res)

    // getAdmin().then(admin => console.log("Admin: ", admin));
getTokenAddress().then(token => console.log("Token Address: ", token));
getContractBalance().then(balance => console.log("Contract Balance: ", balance));

}

main();
