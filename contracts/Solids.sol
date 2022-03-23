// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./FineCoreInterface.sol";

/// @custom:security-contact skyfly200@gmail.com
contract Solids is ERC721Enumerable, ERC721Burnable, ERC721Royalty, AccessControl {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    uint public TOKEN_LIMIT = 1000; // not including bonus
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    FineCoreInterface coreContract;
    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) public scripts;
    EnumerableSet.UintSet private availableArt;
    bool public locked = false;

    address payable public artistAddress = payable(0xE31a7D022E545eCEd32D276cA880649852c91353);
    address payable public additionalPayee = payable(0x268b87E4F6B7e7BEB58e3128138D4F6b768E1b17);
    uint256 public additionalPayeePercentage = 100;
    uint256 public additionalPayeeRoyaltyPercentage = 100;
    uint96 public royaltyPercent = 7500;

    string public _contractURI = "https://gateway.pinata.cloud/ipfs/QmQMxG3ogmPkdwG9Pm1FHrV172gbCYCQaSSPLsRCF4z5aG";
    string public baseURI = "https://gateway.pinata.cloud/ipfs/QmeEky5aZNmog1fNdbsxAC5X1CkKCfrfns3tPqQ8rb1kiw";
    string public artist = "FAR";
    string public description = "a sample NFT for FINE";
    string public website = "https://fine.digital";
    string public license = "MIT";

    event recievedFunds(address _from, uint _amount);
    
    constructor(address coreAddress, address shopAddress) ERC721("SOLIDS", "SOLIDS") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, shopAddress);
        coreContract = FineCoreInterface(coreAddress);
        // set deafault royalty
        _setDefaultRoyalty(address(this), royaltyPercent);
    }

    /**
     * @dev receive direct ETH transfers
     * @notice for splitting royalties
     */
    receive() external payable {
        emit recievedFunds(msg.sender, msg.value);
    }

    /**
     * @dev split royalties sent to contract (ONLY ETH!)
     */
    function withdraw() onlyRole(DEFAULT_ADMIN_ROLE) external {
        _splitFunds(address(this).balance);
    }

    /**
     * @dev Split payments
     */
    function _splitFunds(uint256 amount) internal {
        if (amount > 0) {
            uint256 partA = amount * coreContract.platformRoyalty() / 10000;
            coreContract.FINE_TREASURY().transfer(partA);
            uint256 partB = amount * additionalPayeeRoyaltyPercentage / 10000;
            if (partB > 0) additionalPayee.transfer(partB);
            artistAddress.transfer((amount - partA) - partB);
        }
    }

    /**
     * @dev init set with art IDs
     */
    function initPool(uint start, uint end) external {
        require(!locked, "settings already locked");
        require(start <= end, "start must come before or equal end");
        uint toAdd = end - start;
        require(availableArt.length() + toAdd <= TOKEN_LIMIT, "cant add more than token limit");
        for (uint i = start; i < end; i++) availableArt.add(i);
    }

    /**
     * @dev init set with art IDs
     */
    function checkPool() external view returns (uint) {
        return availableArt.length();
    }

    /**
     * @dev lookup the URI for a token
      * @param tokenId to retieve URI for
     */
    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        return string(abi.encodePacked(baseURI, "/", Strings.toString(tokenId), ".json"));
    }

    // On-chain Data

    /**
     * @dev lock settings (artwork pool)
     * @dev Only the admin can call this
     */
    function lock() onlyRole(DEFAULT_ADMIN_ROLE) external {
        require(!locked, "settings already locked");
        locked = true;
    }

    /**
     * @dev Store a script
     * @param index in the array of scripts
     * @param script to store
     * @dev Only the admin can call this
     */
    function setScript(uint index, string calldata script) onlyRole(DEFAULT_ADMIN_ROLE) external {
        scripts[index] = script;
    }

    /**
     * @dev Update the base URI field
     * @param _uri base for all tokens 
     * @dev Only the admin can call this
     */
    function setContractURI(string calldata _uri) onlyRole(DEFAULT_ADMIN_ROLE) external {
        _contractURI = _uri;
    }

    /**
     * @dev Update the base URI field
     * @param _uri base for all tokens 
     * @dev Only the admin can call this
     */
    function setBaseURI(string calldata _uri) onlyRole(DEFAULT_ADMIN_ROLE) external {
        baseURI = _uri;
    }

    /**
     * @dev Update the royalty percentage
     * @param _percentage for royalties
     * @dev Only the admin can call this
     */
    function setRoyaltyPercent(uint96 _percentage) onlyRole(DEFAULT_ADMIN_ROLE) external {
        royaltyPercent = _percentage;
    }

    /**
     * @dev Update the additional payee sales percentage
     * @param _percentage for sales
     * @dev Only the admin can call this
     */
    function additionalPayeePercent(uint96 _percentage) onlyRole(DEFAULT_ADMIN_ROLE) external {
        additionalPayeePercentage = _percentage;
    }

    /**
     * @dev Update the additional payee royalty percentage
     * @param _percentage for royalty
     * @dev Only the admin can call this
     */
    function additionalPayeeRoyaltyPercent(uint96 _percentage) onlyRole(DEFAULT_ADMIN_ROLE) external {
        additionalPayeeRoyaltyPercentage = _percentage;
    }

    /**
     * @dev Update the description field
     * @param _desc description of the project
     * @dev Only the admin can call this
     */
    function setDescription(string calldata _desc) onlyRole(DEFAULT_ADMIN_ROLE) external {
        description = _desc;
    }

    /**
     * @dev Update the website field
     * @param _url base for all tokens 
     * @dev Only the admin can call this
     */
    function setWebsite(string calldata _url) onlyRole(DEFAULT_ADMIN_ROLE) external {
        website = _url;
    }

    /**
     * @dev Mint a token 
     * @param to address to mint the token to
     * @dev Only the minter role can call this
     */
    function mint(address to) external onlyRole(MINTER_ROLE) returns (uint) {
        require(locked, "settings not locked");
        require(availableArt.length() > 0, "all tokens minted");
        uint randomness = coreContract.getRandomness(availableArt.length(), block.timestamp);
        uint randIndex = randomness % availableArt.length();
        uint artId = availableArt.at(randIndex);
        availableArt.remove(artId);
        _safeMint(to, artId);
        return artId;
    }

    /**
     * @dev Mint a bonus token (for infinites AI holders)
     * @param to address to mint the token to
     * @dev Only the minter role can call this
     */
    function mintBonus(address to, uint infiniteId) external onlyRole(MINTER_ROLE) returns (uint bonusId) {
        require(locked, "settings not locked");
        bonusId = 10000 + infiniteId;
        require(!_exists(bonusId), "Token already minted");
        _safeMint(to, bonusId);
    }

    // getters for interface

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }
    
    function getArtistAddress() external view returns (address payable) {
        return artistAddress;
    }

    function getAdditionalPayee() external view returns (address payable) {
        return additionalPayee;
    }

    function getAdditionalPayeePercentage() external view returns (uint256) {
        return additionalPayeePercentage;
    }

    function getTokenLimit() external view returns (uint256) {
        return TOKEN_LIMIT;
    }

    // The following functions are overrides required by Solidity.

    /**
     * @dev get baseURI for all tokens
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721Royalty, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721Royalty)
    {
        super._burn(tokenId);
    }
}
