//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol"; 
 

contract BasketballScores {
    using ECDSA for bytes32; 

    struct Match {
        address playerA; 
        address playerB; 
        uint256 homeScore; 
        uint256 guestScore; 
        uint256 timestamp; 
    }

    Match[] public matches; 

    event MatchSaved(
        address indexed playerA, 
        address indexed playerB, 
        uint256 home, 
        uint256 guest, 
        uint256 timestamp, 
        uint256 matchID
        ); 

    function toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)); 
    }

function saveMatchWithSigs (
    address playerA, 
    address playerB, 
    uint256 homeScore, 
    uint256 guestScore, 
    bytes memory sigA, 
    bytes memory sigB
 ) public {
        //Build the message hash as in frontend
        bytes32 messageHash = keccak256(abi.encodePacked(address(this), playerA, playerB, homeScore, guestScore)); 
        bytes32 ethSignedMessageHash = toEthSignedMessageHash(messageHash);
   
   //recover signers 
   address recoveredA = ethSignedMessageHash.recover(sigA); 
   address recoveredB = ethSignedMessageHash.recover(sigB);

   require (recoveredA == playerA, "Invalid signature A");
   require (recoveredB == playerB, "Invalid signature B");

   //push the match to storage
    matches.push(Match({
        playerA: playerA, 
        playerB: playerB, 
        homeScore: homeScore, 
        guestScore: guestScore, 
        timestamp: block.timestamp
    }));

    uint256 matchID = matches.length - 1;   
    emit MatchSaved(playerA, playerB, homeScore, guestScore, block.timestamp, matchID);
    }

    ///@notice Convenience getter for matches length
    function getMatchesLength() public view returns (uint256) {
        return matches.length;
}

/// @notice Get match by id 
function getMatch(uint256 id) external view returns (Match memory) {
    require (id < matches.length, "Out of range");  
    return matches[id];
}
}