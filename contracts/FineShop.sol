// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface FineCore {
    function getProjectAddress(uint id) external view returns (address);
    function getProjectID(address project) external view returns (uint);
    function FINE_TREASURY() external returns (address payable);
    function platformPercentage() external returns (uint256);
}

interface FineNFT {
    function mint(address to) external returns (uint);
    function getArtistAddress() external view returns (address payable);
    function getAdditionalPayee() external view returns (address payable);
    function getAdditionalPayeePercentage() external view returns (uint256);
    function getTokenLimit() external view returns (uint256);
    function totalSupply() external view returns (uint256);
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
    mapping(uint => uint) public projectPremintAllocation;
    mapping(uint => uint) public projectPrice;
    mapping(uint => address) public projectCurrencyAddress; // TODO: create setter
    mapping(uint => string) public projectCurrencySymbol; // TODO: create setter
    mapping(uint => uint) public projectBulkMintCount; // TODO: create setter
    mapping(uint => bool) public projectLive;
    mapping(uint => bool) public projectPause;
    mapping(uint256 => bool) public contractFilterProject;
    mapping(address => mapping (uint256 => uint256)) public projectMintCounter;
    mapping(uint256 => uint256) public projectMintLimit;
    mapping(uint256 => mapping (address => bool) ) public projectAllowList;
    mapping(uint256 => uint256 ) public projectAllowListAllocation;
    
    constructor(address _fineCoreAddresss) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        fineCore = FineCore(_fineCoreAddresss);
    }

    // Mgmt Functions

    /**
     * @dev set the owner of a project
     * @param _projectId to set owner of
     * @param newOwner to set as owner
     */
    function setOwner(uint _projectId, address newOwner) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(projectOwner[_projectId] != newOwner, "can't be same owner");
        require(projectOwner[_projectId] != address(0x0), "owner can't be zero address");
        projectOwner[_projectId] = newOwner;
    }

    /**
     * @dev push the project to live (locks setting and can premint)
     * @param _projectId to push live
     */
    function goLive(uint _projectId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        projectLive[_projectId] = true;
        projectPause[_projectId] = true;
    }

    /**
     * @dev unpause a project as admin
     * @param _projectId to unpause
     */
    function unpauseAdmin(uint _projectId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        projectPause[_projectId] = false;
    }

    /**
     * @dev pause a project as admin
     * @param _projectId to pause
     */
    function pauseAdmin(uint _projectId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        projectPause[_projectId] = true;
    }

    /**
     * @dev unpause a project
     * @param _projectId to unpause
     */
    function unpause(uint _projectId) external {
        require(msg.sender == projectOwner[_projectId], "only owner");
        projectPause[_projectId] = false;
    }

    /**
     * @dev pause a project
     * @param _projectId to pause
     */
    function pause(uint _projectId) external {
        require(msg.sender == projectOwner[_projectId], "only owner");
        projectPause[_projectId] = true;
    }

    /**
     * @dev set the price of a project
     * @param _projectId to set price of
     * @param price to set project to
     */
    function setPrice(uint _projectId, uint price) external {
        require(msg.sender == projectOwner[_projectId], "only owner");
        require(!projectLive[_projectId], "already live");
        projectPrice[_projectId] = price;
    }

    /**
     * @dev set the premints of a project
     * @param _projectId to set premints of
     * @param premints to set project to
     */
    function setPremints(uint _projectId, uint premints) external {
        require(msg.sender == projectOwner[_projectId], "only owner");
        require(!projectLive[_projectId], "already live");
        projectPremintAllocation[_projectId] = premints;
    }
  
    /**
     * @dev set the mint limiter of a project
     * @param _projectId project to set mint limit of
     * @param _limit mint limit per address
     */
    function setProjectMintLimit(uint256 _projectId, uint8 _limit) public onlyRole(DEFAULT_ADMIN_ROLE) {
        projectMintLimit[_projectId] = _limit;
    }

    /**
     * @dev set the contract mint filter
     * @param _projectId project to toggle the contract minting filter on
     */
    function toggleContractFilter(uint256 _projectId) public onlyRole(DEFAULT_ADMIN_ROLE) {
        contractFilterProject[_projectId]=!contractFilterProject[_projectId];
    }

    // Sale Functions

    /**
     * @dev handle payment for a purchase
     * @param _projectId to handle payment for
     * @param count to purchase
     */
    function handlePayment(uint _projectId, uint count) internal {
        uint price = projectPrice[_projectId].mul(count);
        if (keccak256(abi.encodePacked(projectCurrencySymbol[_projectId])) != keccak256(abi.encodePacked("ETH"))){
            require(msg.value==0, "this project accepts a different currency and cannot accept ETH");
            require(ERC20(projectCurrencyAddress[_projectId]).allowance(msg.sender, address(this)) >= price, "Insufficient Funds Approved for TX");
            require(ERC20(projectCurrencyAddress[_projectId]).balanceOf(msg.sender) >= price, "Insufficient balance.");
            _splitFundsERC20(_projectId, count);
        } else {
            require(msg.value >= price, "Must send minimum value to mint!");
            _splitFundsETH(_projectId, count);
        }
    }

    /**
     * @dev split funds of payment made with ETH
     * @param _projectId to purchase
     * @param count number of tokens to purchase
     */
    function _splitFundsETH(uint256 _projectId, uint count) internal {
        if (msg.value > 0) {
            uint256 pricePerTokenInWei = projectPrice[_projectId];
            uint salePrice = pricePerTokenInWei.mul(count);
            uint256 refund = msg.value.sub(salePrice);
            if (refund > 0) {
                payable(msg.sender).transfer(refund);
            }
            uint256 platformAmount = salePrice.div(100).mul(fineCore.platformPercentage());
            if (platformAmount > 0) {
                fineCore.FINE_TREASURY().transfer(platformAmount);
            }
            FineNFT nftContract = FineNFT(fineCore.getProjectAddress(_projectId));
            nftContract.getArtistAddress();
            uint256 projectFunds = salePrice.sub(platformAmount);
            uint256 additionalPayeeAmount;
            if (nftContract.getAdditionalPayeePercentage() > 0) {
                additionalPayeeAmount = projectFunds.div(100).mul(nftContract.getAdditionalPayeePercentage());
                if (additionalPayeeAmount > 0) {
                    nftContract.getAdditionalPayee().transfer(additionalPayeeAmount);
                }
            }
            uint256 creatorFunds = projectFunds.sub(additionalPayeeAmount);
            if (creatorFunds > 0) {
                nftContract.getArtistAddress().transfer(creatorFunds);
            }
        }
    }

    /**
     * @dev split funds of payment made with ERC20 tokens
     * @param _projectId to purchase
     * @param count number of tokens to purchase
     */
    function _splitFundsERC20(uint256 _projectId, uint count) internal {
        uint256 pricePerTokenInWei = projectPrice[_projectId];
        uint salePrice = pricePerTokenInWei.mul(count);
        uint256 platformAmount = salePrice.div(100).mul(fineCore.platformPercentage());
        if (platformAmount > 0) {
            ERC20(projectCurrencyAddress[_projectId]).transferFrom(msg.sender, fineCore.FINE_TREASURY(), platformAmount);
        }
        FineNFT nftContract = FineNFT(fineCore.getProjectAddress(_projectId));
        nftContract.getArtistAddress();
        uint256 projectFunds = salePrice.sub(platformAmount);
        uint256 additionalPayeeAmount;
        if (nftContract.getAdditionalPayeePercentage() > 0) {
            additionalPayeeAmount = projectFunds.div(100).mul(nftContract.getAdditionalPayeePercentage());
        if (additionalPayeeAmount > 0) {
            ERC20(projectCurrencyAddress[_projectId]).transferFrom(msg.sender, nftContract.getAdditionalPayee(), additionalPayeeAmount);
        }
        }
        uint256 creatorFunds = projectFunds.sub(additionalPayeeAmount);
        if (creatorFunds > 0) {
            ERC20(projectCurrencyAddress[_projectId]).transferFrom(msg.sender, nftContract.getArtistAddress(), creatorFunds);
        }
    }

    // Minting Functions

    /**
     * @dev purchase tokens of a project and send to a specific address
     * @param _projectId to purchase
     * @param to address to send token to
     * @param count number of tokens to purchase
     */
    function purchaseTo(uint _projectId, address to, uint count) public payable returns (uint256) {
        require(projectLive[_projectId], "project not live");
        require(!projectPause[_projectId], "project paused");
        FineNFT nftContract = FineNFT(fineCore.getProjectAddress(_projectId));
        require(nftContract.totalSupply() > projectPremintAllocation[_projectId], "premints remaining");
        require(count <= projectBulkMintCount[_projectId], "excedes minting limit");
        if (contractFilterProject[_projectId]) require(msg.sender == tx.origin, "No Contract Buys");
        if (projectMintLimit[_projectId] > 0) {
            require(projectMintCounter[msg.sender][_projectId] < projectMintLimit[_projectId], "Reached minting limit");
            projectMintCounter[msg.sender][_projectId]++;
        }
        if (
            projectAllowListAllocation[_projectId] > 0 &&
            nftContract.totalSupply() < (projectAllowListAllocation[_projectId] + projectPremintAllocation[_projectId])
        ) { // Allow listed sale active and still available
            require(projectAllowList[_projectId][msg.sender], "not on allowlist");
        }
        handlePayment(_projectId, count);
        uint tokenID;
        // loop and mint count number of tokens specified by count
        require(nftContract.totalSupply() < nftContract.getTokenLimit(), "exceeds quantity remaining");
        for (uint i = 0; i < count; i++) {
            tokenID = nftContract.mint(to);
        }
        return tokenID; // returns id of last token minted
    }

    /**
     * @dev purchase tokens of a project
     * @param _projectId to purchase
     * @param count number of tokens to purchase
     */
    function buy(uint _projectId, uint count) external payable returns (uint256) {
        return purchaseTo(_projectId, msg.sender, count);
    }

    /**
     * @dev purchase tokens of a project for another address
     * @param _projectId to purchase
     * @param to recipients address
     * @param count number of tokens to purchase
     */
    function buyFor(uint _projectId, address to, uint count) external payable returns (uint256) {
        return purchaseTo(_projectId, to, count);
    }

    /**
     * @dev premint tokens of a project
     * @param _projectId to purchase
     */
    function premint(uint _projectId) external payable returns (uint256) {
        require(projectLive[_projectId], "project not live");
        require(msg.sender == projectOwner[_projectId], "only owner");
        FineNFT nftContract = FineNFT(fineCore.getProjectAddress(_projectId));
        require(nftContract.totalSupply() < projectPremintAllocation[_projectId], "max premints");
        address to = msg.sender;
        uint tokenID = nftContract.mint(to);
        return tokenID;
    }
}
