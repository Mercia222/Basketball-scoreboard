🏀 <b>Basketball Scoreboard dApp</b>

A modern Web3 Basketball Scoreboard built with JavaScript, Solidity, Hardhat, and Ethers.js.
This project combines a classic basketball scoreboard with blockchain technology to create an immutable, transparent, and decentralized scoring system.

Built with ❤️ for learning, experimentation, and pushing the culture of Web3 sports applications forward.

✨ <b>Features</b>
- Real-time basketball scoreboard
- MetaMask wallet connection
- Smart contract integration with Solidity
- Scores stored on-chain
- Transparent & tamper-proof score tracking
- Basketball sound effects
- Multi-wallet inspired UI
- Built with Hardhat + Ethers.js

🧠 <b>Vision</b>

This project explores how blockchain can be used beyond finance by bringing transparency and permanence to sports data.

Instead of storing scores only locally in the browser, game scores can be verified and stored on-chain, creating:

transparent score history
verifiable matches
anti-cheating systems
decentralized sports applications

<b>Tech Stack</b>
Frontend
HTML5
CSS3
JavaScript
Blockchain
Solidity
Hardhat
Ethers.js
OpenZeppelin
Wallets
MetaMask
Coinbase Wallet
Exodus
Trust Wallet


🚀 <b>Getting Started</b>
<br>
1️⃣ Clone the repository
git clone https://github.com/yourusername/BasketballScoreBoard.git
cd BasketballScoreBoard

2️⃣ Install dependencies
npm install

3️⃣ Compile smart contracts
npx hardhat compile

4️⃣ Deploy contract
npx hardhat run scripts/deploy.js --network sepolia

5️⃣ Start frontend
You can use VS Code Live Server or simply open:
index.html

🔐<b> Environment Variables</b>
Create a .env file:
PRIVATE_KEY=your_wallet_private_key
SEPOLIA_RPC_URL=your_rpc_url

<b>Smart Contract Overview</b>

The Solidity contract allows:

creating games
updating scores
retrieving scores
storing match data on-chain

Example:
function updateScore(
    uint _gameId,
    uint _homeScore,
    uint _awayScore
) public

🎨 <b>Inspiration</b>
This project was inspired by:

street basketball culture
Web3 transparency
decentralized applications
interactive sports experiences

📸 <b>Preview</b>
A stylish Web3 basketball scoreboard interface with wallet connection, sound effects, and blockchain integration.

🤝 <b>Contributing</b>
Contributions, ideas, and feedback are welcome.
Feel free to fork the project and build your own version 🚀

👩🏽‍💻 Author

Built by Mercia Ravelo✨
Blockchain Developer | Web3 Builder | Creative Technologist
🇲🇬 Madagascar × Web3 × Innovation
