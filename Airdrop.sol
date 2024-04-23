// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Airdrop {
    address public admin;
    IERC20 public token; // The ERC20 token to be distributed

    constructor(address _tokenAddress) {
        admin = msg.sender;
        token = IERC20(_tokenAddress);
    }

    function drop(address[] memory recipients, uint256[] memory amounts) external {
        require(msg.sender == admin, "Only admin can perform this action");
        require(recipients.length == amounts.length, "Array lengths must match");

        for (uint256 i = 0; i < recipients.length; i++) {
            token.transfer(recipients[i], amounts[i]);
        }
    }

    function withdrawTokens() external {
        require(msg.sender == admin, "Only admin can withdraw tokens");
        token.transfer(admin, token.balanceOf(address(this)));
    }

    // In case the contract receives ether accidentally
    receive() external payable {
        revert("Contract does not accept Ether");
    }
}
