# HashStorage Smart Contract

This smart contract provides a secure and efficient way to store and retrieve hash values associated with Ethereum addresses. The contract is built for storing verification hashes, timestamps, and managing multiple hash records per address.

## Features

### Data Structures

- **HashRecord**: A structure containing:
  - `hashValue`: The stored hash string
  - `timestamp`: When the hash was stored
  - `id`: Unique identifier for the hash

### Core Functions

#### Store Hash
```solidity
function storeHash(string memory _hash) public returns (uint256)
```
- Stores a new hash for the sender's address
- Automatically assigns an ID and timestamp
- Returns the assigned ID
- Gas cost varies with hash length

#### Get All Hashes
```solidity
function getAllHashes(address _address) public view returns (HashRecord[] memory)
```
- Retrieves all hashes stored for a specific address
- Returns an array of HashRecord structs
- No gas cost (view function)

#### Get Hash by ID
```solidity
function getHashById(address _address, uint256 _id) public view returns (string memory hashValue, uint256 timestamp)
```
- Retrieves a specific hash using its ID and address
- Returns the hash value and timestamp
- Throws if ID doesn't exist
- No gas cost (view function)

#### Get Hash Count
```solidity
function getHashCount(address _address) public view returns (uint256)
```
- Returns the total number of hashes stored for an address
- No gas cost (view function)

#### Get Latest Hash
```solidity
function getMyLatestHash() public view returns (string memory hashValue, uint256 timestamp)
```
- Returns the sender's most recent hash and timestamp
- Throws if no hashes exist
- No gas cost (view function)

## Usage Example

```javascript
// Store a new hash
const hashId = await contract.storeHash("0x123...");

// Get all hashes for an address
const allHashes = await contract.getAllHashes(userAddress);

// Get specific hash by ID
const [hash, timestamp] = await contract.getHashById(userAddress, 0);

// Get total hash count
const count = await contract.getHashCount(userAddress);

// Get your latest hash
const [latestHash, latestTimestamp] = await contract.getMyLatestHash();
```

## Security Considerations

- All functions are public but data access is controlled
- Hashes are stored permanently on the blockchain
- No function to delete or modify stored hashes
- Gas costs increase with the number of stored hashes

## Technical Details

- Solidity Version: ^0.8.0
- License: MIT
- Storage Pattern: Mapping of arrays
- State Variables:
  - `addressHashes`: Mapping of address to hash records
  - `hashCount`: Mapping of address to total hash count

## Development and Testing

1. Deploy the contract to your preferred network
2. Use web3 libraries or tools like Hardhat for testing
3. Monitor gas usage for large-scale operations
4. Consider implementing batch operations for efficiency

## Best Practices

- Store minimal hash data to reduce gas costs
- Implement front-end validation before storing hashes
- Keep track of assigned IDs for efficient retrieval
- Use events for better transaction tracking (could be added)