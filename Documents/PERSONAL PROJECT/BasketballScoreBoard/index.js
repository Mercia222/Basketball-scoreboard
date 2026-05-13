// ethers is already available globally from the <script> tag


window.addEventListener("load", () => {
  console.log("ethers?", window.ethers);
  if (!window.ethers) alert("Ethers did NOT load. Check your script tag / internet / adblock.");
});


let homeStoreEl = document.getElementById("home-score"); 
let homeScore = 0; 

let guestStoreEl = document.getElementById("guest-score");
let guestScore = 0; 

const scoreSound = document.getElementById("score-sound");
const resetSound = document.getElementById("reset-sound");  


function increaseHomeScoreOne() {
    homeScore += 1;
    homeStoreEl.textContent = homeScore;
}

function increaseHomeScoreTwo() {
     homeScore += 2;
     homeStoreEl.textContent = homeScore;
}

function increaseHomeScoreThree() {
     homeScore += 3;
     homeStoreEl.textContent = homeScore; 
}


function increaseGuestScoreOne() {
    guestScore += 1; 
    guestStoreEl.textContent = guestScore; 
}

function increaseGuestScoreTwo() {
    guestScore += 2; 
    guestStoreEl.textContent = guestScore; 
}

function increaseGuestScoreThree() {
    guestScore += 3; 
    guestStoreEl.textContent = guestScore;
}

function reset() {
    homeScore = 0; 
    guestScore = 0; 
    homeStoreEl.textContent = homeScore;
    guestStoreEl.textContent = guestScore;
}

function playScoreSound() {
    scoreSound.currentTime = 0; 
    scoreSound.play(); 
}

function playResetSound() {
    resetSound.currentTime = 0; 
    resetSound.play();
}

function increaseHomeScoreOne(){
    homeScore += 1;
    homeStoreEl.textContent = homeScore;
    playScoreSound();
}

function increaseHomeScoreTwo(){
    homeScore += 2;
    homeStoreEl.textContent = homeScore;
    playScoreSound();
}
 function increaseHomeScoreThree(){
    homeScore += 3;
    homeStoreEl.textContent = homeScore;
    playScoreSound();
}

function increaseGuestScoreOne(){
    guestScore += 1;
    guestStoreEl.textContent = guestScore;
    playScoreSound();
}

function increaseGuestScoreTwo(){
    guestScore += 2;
    guestStoreEl.textContent = guestScore;
    playScoreSound();
}
 function increaseGuestScoreThree(){
    guestScore += 3;
    guestStoreEl.textContent = guestScore;
    playScoreSound();
}


  function stopAudio(audio){
    if (!audio.paused) {
      audio.pause(); 
      audio.currentTime = 0; 
    }
  }


  function fadeOutAudio(audio) {
    let fade = setInterval(()=> {
      if (audio.volume > 0.1) {
          audio.volume -= 0.1; 
      } else {
        clearInterval(fade); 
        audio.pause(); 
        audio.currentTime = 0; 
        audio.volume = 1; 
      }
    }, 50); 
    /*if (!resetSound.paused){
      fadeOutAudio(resetSound); 
    }*/
  }

  function toggleResetSound(){
    if (!resetSound.paused){
      fadeOutAudio(resetSound); 
  
    } else {
      //if sound is not playing → play it 
      resetSound.currentTime = 0; 
      resetSound.play(); 
    }
  }

  function reset(){

    //Stop score sound if playing 
    stopAudio(scoreSound);

    homeScore = 0;
    guestScore = 0;
    homeStoreEl.textContent = homeScore;
    guestStoreEl.textContent = guestScore;

    //play / stop reset sound 
    toggleResetSound();
  }

        
  window.reset = reset;

//connect Wallet Modal Button
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("connectWallet");
  const modal = document.getElementById("walletModal");

  if (!btn) console.error("❌ #connectWallet not found in HTML");
  if (!modal) console.error("❌ #walletModal not found in HTML");

  btn?.addEventListener("click", () => {
    modal.style.display = "block";
  });
});



function closeModal(){
    document.getElementById("walletModal").style.display = "none"; 
}

//make closeModal global so HTML onclick can see it 
window.closeModal = closeModal; 

//also expose score functions to HTML onclicks 
window.increaseHomeScoreOne = increaseHomeScoreOne; 
window.increaseHomeScoreTwo = increaseHomeScoreTwo; 
window.increaseHomeScoreThree = increaseHomeScoreThree; 
window.increaseGuestScoreOne = increaseGuestScoreOne; 
window.increaseGuestScoreTwo = increaseGuestScoreTwo; 
window.increaseGuestScoreThree = increaseGuestScoreThree; 
window.reset = reset; 

// === WEB3 / CONTRACT ===

let provider; 
let signer; 
let contract; 

const CONTRACT_ADDRESS = "<<< YOUR_DEPLOYED_CONTRACT_ADDRESS>>>"; 

const ABI = [
    //{
        {
        "inputs": [],
        "name": "ECDSAInvalidSignature",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "length",
            "type": "uint256"
          }
        ],
        "name": "ECDSAInvalidSignatureLength",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "name": "ECDSAInvalidSignatureS",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "playerA",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "playerB",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "home",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "guest",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "matchID",
            "type": "uint256"
          }
        ],
        "name": "MatchSaved",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getMatch",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "playerA",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "playerB",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "homeScore",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "guestScore",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct BasketballScores.Match",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getMatchesLength",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "matches",
        "outputs": [
          {
            "internalType": "address",
            "name": "playerA",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "playerB",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "homeScore",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "guestScore",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "playerA",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "playerB",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "homeScore",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "guestScore",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "sigA",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "sigB",
            "type": "bytes"
          }
        ],
        "name": "saveMatchWithSigs",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    async function initEthers() {
      if (!window.ethereum) {
        console.log("No injected provider found"); 
        return; 
      }

        provider = new ethers.providers.Web3Provider(window.ethereum); 
        signer = provider.getSigner(); 
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer); 

    }

    let connected = {
      provider: null,
      signer: null,
      address: null,
      label: null,
    };
    
    async function setConnected(newProvider, label) {
      provider = newProvider;
      signer = provider.getSigner();
    
      const addr = await signer.getAddress();
    
      connected.provider = provider;
      connected.signer = signer;
      connected.address = addr;
      connected.label = label;
    
      setWalletBadge(addr, label);
    
      console.log("✅ Connected:", label, addr);
      return addr;
    }
    

    // === WALLET CONNECTIONS === 


// MetaMask
async function connectMetaMask() {
  
    try {
      if (!window.ethereum) {
        alert("No wallet found. Install MetaMask.");
        return;
      }
  
    
  
      if (!mm || !mm.isMetaMask) {
        alert("MetaMask not detected. Disable Coinbase Wallet extension and refresh.");
        return;
      }
  
      console.log("✅ Using MetaMask provider:", mm);
  
      // Ask MetaMask for accounts
      const accounts = await mm.request({ method: "eth_requestAccounts" });
      const addr = accounts?.[0];
  
      if (!addr) {
        alert("No account returned by MetaMask.");
        return;
      }
  
      // Build ethers provider from MetaMask provider
      const mmProvider = new ethers.providers.Web3Provider(mm, "any");
      await setConnected(mmProvider, "MetaMask");
  
      alert("Connected to MetaMask: " + addr);
      closeModal();
    } catch (err) {
      console.log("❌ MetaMask connect error:", err);
      alert(
        "MetaMask connection failed:\n" +
        (err?.message || JSON.stringify(err))
      );
    }
  }
  


//Coinbase
async function connectCoinbase(){
    /*if (!window.ethereum){
        alert("Please install Coinbase"); 
        return; 
    } */
    try {
        const coinbase = new CoinbaseWalletSDK({
            appName: "Basketball Scoreboard", 
        }); 

        const cbProvider = coinbase.makeWeb3Provider(); 

        await cbProvider.request({ method: "eth_requestAccounts"}); 

        const cbEthersProvider = new ethers.providers.Web3Provider(cbProvider); 
        const addr = await setConnected(cbEthersProvider, "Coinbase"); 

        alert("Connected to Coinbase Wallet: " + addr); 
        closeModal(); 
    } catch (error) {
        console.log(error); 
    }
}

//WalletConnect
async function connectWalletConnect(){
  try {
    const wcProvider = new WalletConnectProvider.default({
      rpc: {1: "https://mainnet.infura.io/v3/910ae00116b04f16b9776d04163d3cb3"}
    });

    await wcProvider.enable();

   const wcEthersProvider = new ethers.providers.Web3Provider(wcProvider); 
   const addr = await setConnected(wcEthersProvider, "WalletConnect"); 

    alert("Connected to WalletConnect: " + addr);
    closeModal();
  } catch (error) {
    console.log(error);
  }
}


//expose wallet functions for HTML onclick 
window.connectMetaMask = connectMetaMask;
console.log("Injected ethereum:", window.ethereum);
console.log("Has providers array?", !!window.ethereum?.providers);
console.log("Providers:", window.ethereum?.providers?.map(p => ({
  isMetaMask: !!p.isMetaMask,
  isCoinbaseWallet: !!p.isCoinbaseWallet
})));


window.connectCoinbase = connectCoinbase; 
window.connectWalletConnect = connectWalletConnect; 



//click badge to copy address
/* document.getElementById("walletBadge").onclick = async () => {
  try {
    const text = document.getElementById("walletBadge").innerText;
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  } catch (e) {
    console.log(e);
  }
};*/

// =======================
// WALLET BADGE (top right)
// =======================
function shortAddress(addr){
  return addr ? `${addr.slice(0,6)}...${addr.slice(-4)}` : "";
}

function setWalletBadge(addr, label = "Wallet"){
  const el = document.getElementById("walletBadge");
  if (!el) return;
  el.innerHTML = `<span class="wallet-dot"></span> ${label}: ${shortAddress(addr)}`;
}

// click badge to copy just the address (if connected)
/*document.getElementById("walletBadge").onclick = async () => {
  try {
    if (!signer) return;
    const addr = await signer.getAddress();
    await navigator.clipboard.writeText(addr);
    alert("Address copied!");
  } catch (e) {
    console.log(e);
  }
};*/

document.getElementById("walletBadge").onclick = async () => {
  try {
    if (!signer) return;
    const addr = await signer.getAddress();
    await navigator.clipboard.writeText(addr);
    alert("Address copied!");
  } catch (e) {
    console.log(e);
  }
};

function getInjectedProvider(prefer = "metamask") {
  const eth = window.ethereum;
  if (!eth) return null;

  if (eth.providers?.length) {
    if (prefer === "metamask") return eth.providers.find(p => p.isMetaMask) || eth.providers[0];
    if (prefer === "coinbase") return eth.providers.find(p => p.isCoinbaseWallet) || eth.providers[0];
    return eth.providers[0];
  }

  return eth;
}

const mm = getInjectedProvider("metamask");


// =======================
// RECEIPT / SIGNING STATE
// =======================
let connectedAddress = null;
let connectedLabel = null;

let playerA = null;
let playerB = null;
let sigA = null;
let sigB = null;
let messageHash = null;

// IMPORTANT: Use a stable "domain" value. Since you're not deploying now, we use your CONTRACT_ADDRESS constant.
// You can later swap to the real deployed address.
function buildMessageHash(a, b, h, g) {
  return ethers.utils.solidityKeccak256(
    ["address","address","address","uint256","uint256"],
    [CONTRACT_ADDRESS, a, b, h, g]
  );
}

async function ensureConnected() {
  if (!signer) {
    alert("Connect a wallet first.");
    throw new Error("Not connected");
  }
  const addr = await signer.getAddress();
  return addr;
}

function setPlayerUI() {
  const aEl = document.getElementById("playerAAddr");
  const bEl = document.getElementById("playerBAddr");
  if (aEl) aEl.textContent = playerA ? playerA : "Not signed";
  if (bEl) bEl.textContent = playerB ? playerB : "Not signed";
}

function updateReceiptUI(obj) {
  const pre = document.getElementById("receiptText");
  if (pre) pre.textContent = JSON.stringify(obj, null, 2);

  // QR: proofHash (short)
  try {
    const canvas = document.getElementById("qrCanvas");
    if (!canvas || !window.QRious) return;
    const qr = new QRious({
      element: canvas,
      value: obj.proofHash || "no-proof",
      size: 180
    });
  } catch (e) {
    console.log(e);
  }
}


function makeReceiptPayload(verificationStatus) {
  // We create a "receipt" that can be verified later with the signatures.
  const payload = {
    app: "Basketball Scoreboard",
    version: "1.0",
    chainHint: "gasless-signature-mode",
    contractDomain: CONTRACT_ADDRESS,
    homeScore,
    guestScore,
    playerA,
    playerB,
    messageHash,
    sigA,
    sigB,
    verified: verificationStatus,
    timestamp: new Date().toISOString(),
  };

  // A single proof hash for sharing (hash of the whole receipt content)
  payload.proofHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(JSON.stringify(payload))
  );

  return payload;
}

// =======================
// SIGN BUTTONS
// =======================
async function signAsHome() {
  const addr = await ensureConnected();

  // In this UX, whoever is currently connected signs as Home.
  playerA = addr;

  // If guest already set, hash uses both; if not, we temporarily set guest to zero address
  const tempB = playerB || "0x0000000000000000000000000000000000000000";
  messageHash = buildMessageHash(playerA, tempB, homeScore, guestScore);

  sigA = await signer.signMessage(ethers.utils.arrayify(messageHash));

  setPlayerUI();
  updateReceiptUI(makeReceiptPayload(false));
}

async function signAsGuest() {
  const addr = await ensureConnected();

  playerB = addr;

  const tempA = playerA || "0x0000000000000000000000000000000000000000";
  messageHash = buildMessageHash(tempA, playerB, homeScore, guestScore);

  sigB = await signer.signMessage(ethers.utils.arrayify(messageHash));

  setPlayerUI();
  updateReceiptUI(makeReceiptPayload(false));
}

// =======================
// VERIFY + STORE PROOF
// =======================
function verifyOne(expected, signature) {
  if (!expected || !signature || !messageHash) return false;
  const recovered = ethers.utils.verifyMessage(ethers.utils.arrayify(messageHash), signature);
  return recovered.toLowerCase() === expected.toLowerCase();
}

function saveReceiptToLocalStorage(receipt) {
  const key = "bbs_receipts";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.unshift(receipt);
  localStorage.setItem(key, JSON.stringify(existing));
}

function verifySignatures() {
  if (!playerA || !playerB || !sigA || !sigB) {
    alert("Both players must sign first.");
    return;
  }

  // IMPORTANT:
  // For strict verification, the hash must be built with BOTH addresses.
  // Rebuild messageHash properly now:
  messageHash = buildMessageHash(playerA, playerB, homeScore, guestScore);

  const okA = verifyOne(playerA, sigA);
  const okB = verifyOne(playerB, sigB);

  const verified = okA && okB;

  const receipt = makeReceiptPayload(verified);
  updateReceiptUI(receipt);

  if (verified) {
    saveReceiptToLocalStorage(receipt);
    alert("✅ Verified! Proof saved locally.");
  } else {
    alert("❌ Not verified. One or both signatures don't match.");
  }
}

// =======================
// EXPORT / CLEAR
// =======================
function downloadReceipt() {
  const pre = document.getElementById("receiptText");
  if (!pre || pre.textContent === "No receipt yet.") {
    alert("No receipt to download yet.");
    return;
  }

  const blob = new Blob([pre.textContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `basketball-receipt-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

function clearReceipts() {
  localStorage.removeItem("bbs_receipts");
  alert("Saved proofs cleared.");
}

// Expose for HTML onclick
window.signAsHome = signAsHome;
window.signAsGuest = signAsGuest;
window.verifySignatures = verifySignatures;
window.downloadReceipt = downloadReceipt;
window.clearReceipts = clearReceipts;
