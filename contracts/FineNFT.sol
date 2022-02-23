// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.4.2/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@4.4.2/access/AccessControl.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

interface FineCore {
    function getRandomness(uint256 id, uint256 seed) external view returns (uint256 randomnesss);
    function getProjectID(address project) external view returns (uint);
}

/// @custom:security-contact skyfly200@gmail.com
contract FineNFT is ERC721, ERC721Enumerable, ERC721Burnable, AccessControl {
    using Counters for Counters.Counter;

    uint public TOTAL_SUPPLY = 1000;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    FineCore coreContract;
    Counters.Counter private _tokenIdCounter;
    mapping(uint => uint) public hashes;
    mapping(uint256 => string) scripts;
    string baseURI = "https://api.fine.digital/metadata/";

    string public artist = "fine";
    string public description = "a sample NFT for FINE";
    string public website = "https://api.fine.digital";
    string public license = "MIT";
    
    constructor(address coreAddress) ERC721("FINE Digital", "FINE") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        coreContract = FineCore(coreAddress);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // On-chain data

    /**
     * @dev get project id from core contract
     */
    function projectId() external view returns (uint) {
        return coreContract.getProjectID(address(this));
    }

    /**
     * @dev Store a script
     * @param index base for all tokens 
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
        require(tokenId < TOTAL_SUPPLY, "supply cap reached");
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        hashes[tokenId] = coreContract.getRandomness(tokenId, block.timestamp);
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
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
