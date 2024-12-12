// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationTracker {
    address public owner;
    mapping(address => uint256) public donations;
    uint256 public totalDonations;

    constructor() {
        owner = msg.sender;
    }

    event DonationReceived(address indexed donor, uint256 amount);
    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than zero");
        donations[msg.sender] += msg.value;
        totalDonations += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(address(this).balance > 0, "No funds to withdraw");
        payable(owner).transfer(address(this).balance);
    }
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
