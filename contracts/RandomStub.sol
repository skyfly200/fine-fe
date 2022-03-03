// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract RandomStub {
    // stub the core RNG service function
    function returnValue() external view returns (bytes32){
        return keccak256(abi.encodePacked(
            block.number,
            block.coinbase,
            block.timestamp,
            blockhash(block.number - 1),
            tx.origin
        ));
    }
}