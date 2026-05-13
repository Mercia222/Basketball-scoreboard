// hardhat.config.js
require("dotenv").config(); 
require("@nomicfoundation/hardhat-toolbox");
require("./tasks/accounts"); 

const { PRIVATE_KEY, SEPOLIA_RPC_URL, POLYGON_TESTNET_RPC_URL } = process.env; 

if (!PRIVATE_KEY || !SEPOLIA_RPC_URL || !POLYGON_TESTNET_RPC_URL) {
    throw new Error("Please set your PRIVATE_KEY and SEPOLIA_RPC_URL in a .env file");
  }

module.exports = {
    solidity: "0.8.27",
    networks: {
       
        polygonTestnet: 
        {
          url: "https://rpc-amoy.polygon.technology", 
          accounts: [`0x${process.env.PRIVATE_KEY}`],
        },
       /* polygonTestnet: {
            url: POLYGON_TESTNET_RPC_URL, 
            accounts: [PRIVATE_KEY], 
            
        },*/
    }, 
    //etherscan: {
      //  apiKey: {
         //   sepolia: process.env.ETHERSCAN_API_KEY, 
           // polygonMumbai: process.env.POLYGONSCAN_API_KEY, 
     //   },
  //  },

  
}; 


