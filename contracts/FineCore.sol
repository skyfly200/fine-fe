// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface RandomizerInt {
    function returnValue() external view returns (bytes32);
}

/// @custom:security-contact skyfly200@gmail.com
contract FineCore is AccessControl {
    using Counters for Counters.Counter;

    RandomizerInt entropySource;
    Counters.Counter private _projectCounter;
    mapping(uint => address) public projects;
    mapping(address => bool) public allowlist;

    address payable public FINE_TREASURY = payable(0x7A832c86002323a5de3a317b3281Eb88EC3b2C00);
    uint256 public platformPercentage = 1000;
    uint256 public platformRoyalty = 3333;
    
    constructor(address entropySourceAddress) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        entropySource = RandomizerInt(entropySourceAddress);
    }

    // Project Mgmt Functions

    /**
     * @dev add a project
     * @param project address of the project contract
     * @dev Only the admin can call this
     */
    function addProject(address project) external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint id = _projectCounter.current();
        _projectCounter.increment();
        projects[id] = project;
        allowlist[project] = true;
    }
    
    /**
     * @dev rollback last project add
     * @dev Only the admin can call this
     */
    function rollbackLastProject() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _projectCounter.decrement();
        uint id = _projectCounter.current();
        address project = projects[id];
        allowlist[project] = false;
    }

    /**
     * @dev add a project to the allowlist
     * @param project address to add to the allowlist
     * @dev Only the admin can call this
     */
    function allowProject(address project) external onlyRole(DEFAULT_ADMIN_ROLE) {
        allowlist[project] = true;
    }

    /**
     * @dev remove a project from the allowlist by address
     * @param project address to remove from allowlist
     * @dev Only the admin can call this
     */
    function unallowProject(address project) external onlyRole(DEFAULT_ADMIN_ROLE) {
        allowlist[project] = false;
    }

    /**
     * @dev lookup a projects address by id
     * @param id of the project to retrieve
     */
    function getProjectAddress(uint id) external view returns (address) {
        return projects[id];
    }

    // Randomizer

    /**
     * @dev set Randomizer
     */
    function setRandom(address rand) external onlyRole(DEFAULT_ADMIN_ROLE) {
        entropySource = RandomizerInt(rand);
    }

    /**
     * @dev test Randomizer
     */
    function testRandom() external view onlyRole(DEFAULT_ADMIN_ROLE) returns (bytes32) {
        return entropySource.returnValue();
    }

    /**
     * @dev Call the Randomizer and get some randomness
     */
    function getRandomness(uint256 id, uint256 seed)
        external view returns (uint256 randomnesss)
    {
        require(allowlist[msg.sender], "rng caller not allow listed");
        uint256 randomness = uint256(keccak256(abi.encodePacked(
            entropySource.returnValue(),
            id,
            seed
        )));
        return randomness;
    }
}
