// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts@4.4.2/access/AccessControl.sol";

interface FineCore {
    function getProjectByID(uint id) external view returns (address);
    function getProjectID(address project) external view returns (uint);
}

interface FineNFT {
    function mint(address to) external returns (uint);
}

interface ERC20 {
  function balanceOf(address _owner) external view returns (uint balance);
  function transferFrom(address _from, address _to, uint _value) external returns (bool success);
  function allowance(address _owner, address _spender) external view returns (uint remaining);
}

/// @custom:security-contact skyfly200@gmail.com
contract FineShop is AccessControl {
    using SafeMath for uint256;

    FineCore fineCore;
    mapping(uint => address) public projectOwner;
    mapping(uint => uint) public projectPremints;
    mapping(uint => uint) public projectPremintsMinted;
    mapping(uint => uint) public projectPrice;
    mapping(uint => uint) public projectBulkMintCount;
    mapping(uint => bool) public projectLive;
    mapping(uint => bool) public projectPause;
    
    constructor(address _fineCoreAddresss) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        fineCore = FineCore(_fineCoreAddresss);
    }

    // Mgmt Functions

    /**
     * @dev set the owner of a project
     * @param projectID to set owner of
     * @param newOwner to set as owner
     */
    function setOwner(uint projectID, address newOwner) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(projectOwner[projectID] != newOwner, "can't be same owner");
        require(projectOwner[projectID] != address(0x0), "owner can't be zero address");
        projectOwner[projectID] = newOwner;
    }

    /**
     * @dev push the project to live (locks setting and can premint)
     * @param projectID to push live
     */
    function goLive(uint projectID) external onlyRole(DEFAULT_ADMIN_ROLE) {
        projectLive[projectID] = true;
        projectPause[projectID] = true;
    }

    /**
     * @dev unpause a project as admin
     * @param projectID to unpause
     */
    function unpauseAdmin(uint projectID) external onlyRole(DEFAULT_ADMIN_ROLE) {
        projectPause[projectID] = false;
    }

    /**
     * @dev pause a project as admin
     * @param projectID to pause
     */
    function pauseAdmin(uint projectID) external onlyRole(DEFAULT_ADMIN_ROLE) {
        projectPause[projectID] = true;
    }

    /**
     * @dev unpause a project
     * @param projectID to unpause
     */
    function unpause(uint projectID) external {
        require(msg.sender == projectOwner[projectID], "only owner");
        projectPause[projectID] = false;
    }

    /**
     * @dev pause a project
     * @param projectID to pause
     */
    function pause(uint projectID) external {
        require(msg.sender == projectOwner[projectID], "only owner");
        projectPause[projectID] = true;
    }

    /**
     * @dev set the price of a project
     * @param projectID to set price of
     * @param price to set project to
     */
    function setPrice(uint projectID, uint price) external {
        require(msg.sender == projectOwner[projectID], "only owner");
        require(!projectLive[projectID], "already live");
        projectPrice[projectID] = price;
    }

    /**
     * @dev set the premints of a project
     * @param projectID to set premints of
     * @param premints to set project to
     */
    function setPremints(uint projectID, uint premints) external {
        require(msg.sender == projectOwner[projectID], "only owner");
        require(!projectLive[projectID], "already live");
        projectPremints[projectID] = premints;
    }

    // Minting Functions

    /**
     * @dev handle payment for a purchase
     * @param projectID to handle payment for
     * @param count to purchase
     */
    function handlePayment(uint projectID, uint count) internal {
        uint price = projectPrice[projectID].mul(count);
        require(msg.value >= price, "insuficient payment");
        // TODO: send change if overpaid
        // TODO: send retained payment to payees
    }

    /**
     * @dev purchase tokens of a project and send to a specific address
     * @param projectID to purchase
     * @param to address to send token to
     * @param count number of tokens to purchase
     */
    function purchaseTo(uint projectID, address to, uint count) public payable returns (uint256) {
        require(projectLive[projectID], "project not live");
        require(!projectPause[projectID], "project paused");
        require(count <= projectBulkMintCount[projectID], "excedes mint count limit");
        handlePayment(projectID, count);
        FineNFT nftContract = FineNFT(fineCore.getProjectByID(projectID));
        uint tokenID;
        // TODO: loop and mint count number of tokens
        tokenID = nftContract.mint(to);
        return tokenID;
    }

    /**
     * @dev purchase tokens of a project
     * @param projectID to purchase
     * @param count number of tokens to purchase
     */
    function buy(uint projectID, uint count) external payable returns (uint256) {
        return purchaseTo(projectID, msg.sender, count);
    }

    /**
     * @dev purchase tokens of a project for another address
     * @param projectID to purchase
     * @param to recipients address
     * @param count number of tokens to purchase
     */
    function buyFor(uint projectID, address to, uint count) external payable returns (uint256) {
        return purchaseTo(projectID, to, count);
    }

    /**
     * @dev premint tokens of a project
     * @param projectID to purchase
     */
    function premint(uint projectID) external payable returns (uint256) {
        require(projectLive[projectID], "project not live");
        require(msg.sender == projectOwner[projectID], "only owner");
        require(projectPremintsMinted[projectID] < projectPremints[projectID], "max premints");
        projectPremintsMinted[projectID] = projectPremintsMinted[projectID] + 1;
        FineNFT nftContract = FineNFT(fineCore.getProjectByID(projectID));
        address to = msg.sender;
        uint tokenID = nftContract.mint(to);
        return tokenID;
    }
}
