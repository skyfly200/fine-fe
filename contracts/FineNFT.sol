// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./FineCoreInterface.sol";

/// @custom:security-contact skyfly200@gmail.com
contract FineNFT is ERC721Enumerable, ERC721Burnable, ERC721Royalty, AccessControl {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    uint public TOKEN_LIMIT = 1000;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    FineCoreInterface coreContract;
    Counters.Counter private _tokenIdCounter;
    //mapping(uint => uint) public hashes; // for post generated projects
    mapping(uint => uint) public artworkId; // for pre generated projects
    mapping(uint256 => string) public scripts;

    EnumerableSet.UintSet private availableArt;

    address payable public artistAddress = payable(0x7A832c86002323a5de3a317b3281Eb88EC3b2C00);
    address payable public additionalPayee = payable(0x0);
    uint256 public additionalPayeePercentage = 0;
    uint96 public royaltyPercent = 750;

    string public baseURI = "IPFS HASH HERE";
    string public artist = "fine";
    string public description = "a sample NFT for FINE";
    string public website = "https://fine.digital";
    string public license = "MIT";
    
    constructor(address coreAddress, address shopAddress) ERC721("FINE Digital", "FINE") {
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
    receive() external payable {}

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
            artistAddress.transfer(amount - partA);
        }
    }

    /**
     * @dev init set with art IDs
     */
    function initPool(uint start, uint end) external {
        for (uint i = start; i < end; i++) availableArt.add(i);
    }

    /**
     * @dev init set with art IDs
     */
    function checkPool() external view returns (uint) {
        return availableArt.length();
    }

    /**
     * @dev get baseURI for all tokens
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
     * @dev lookup the URI for a token
      * @param tokenId 5to retieve URI for
     */
    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        return string(abi.encodePacked(baseURI, artworkId[tokenId]));
    }

    // On-chain data

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
    function setBaseURI(string calldata _uri) onlyRole(DEFAULT_ADMIN_ROLE) external {
        baseURI = _uri;
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
    function mint(address to) external onlyRole(MINTER_ROLE) returns (uint tokenId) {
        tokenId = _tokenIdCounter.current();
        require(tokenId < TOKEN_LIMIT, "supply cap reached");
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        uint randomness = coreContract.getRandomness(tokenId, block.timestamp);
        uint randIndex = randomness % availableArt.length();
        uint artId = availableArt.at(randIndex);
        artworkId[tokenId] = artId;
        availableArt.remove(artId);
    }

    // getters for interface
    
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
