// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract Auth {
    mapping(address => bool) public isRegistered;

    function register() external payable {
        require(msg.value == 0.01 ether, "Not enough Matic");
        require(!isRegistered[msg.sender], "already registered");
        isRegistered[msg.sender] = true;
    }
}
