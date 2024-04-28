const { ethers, run } = require("hardhat");

async function deployAndVerify() {
    

    // Verify the contract
    console.log("Verifying contract on Etherscan...");
    await run("verify:verify", {
        address: "0x55aC31eDDbFd481a7b3EF7703344dB1e9d433521",
        constructorArguments: ["0x56eC1BDD1DCF9E5cfA8D8A37C21a4CD806c133D4"] 
    });
}

deployAndVerify().catch(error => {
    console.error("Error deploying and verifying contract:", error);
    process.exit(1);
});
