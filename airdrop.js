async function readContract() {
    console.log('Admin:', await contract.getAdmin());
    console.log('Token Address:', await contract.getTokenAddress());
    console.log('Contract Balance:', await contract.getContractBalance());
}
async function changeAdmin(newAdmin) {
    await contract.changeAdmin(newAdmin);
    console.log('Admin changed to', newAdmin);
}


async function performAirdrop(recipients, amounts) {
    await contract.drop(recipients, amounts);
    console.log('Airdrop completed');
}

// Withdraw tokens from the contract
async function withdrawTokens() {
    await contract.withdrawTokens();
    console.log('Tokens withdrawn from the contract');
}

// Example usage
readContract()
withdrawTokens()




    
