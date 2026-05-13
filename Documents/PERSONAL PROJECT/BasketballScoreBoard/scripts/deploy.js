

const { ethers } = require("hardhat");

//script/deploy.js 
async function main() {
    const [deployer] = await ethers.getSigners(); 
    console.log ("Deploying contracts with: ", deployer.address); 

    const Basketball = await ethers.getContractFactory("BasketballScores"); 
    const basketball = await Basketball.deploy()
    await basketball.deployed(); 

    console.log("BasketballScores deployed to: ", basketball.address); 
}

main()
.then(()=> process.exit(0))
.catch((err) => {
    console.error(err); 
    process.exit(1);
}); 


