// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HashStorage {
    // Hash kaydı için struct
    struct HashRecord {
        string hashValue;
        uint256 timestamp;
        uint256 id;
    }
    
    // Her adres için hash kayıtlarını tutan mapping
    mapping(address => HashRecord[]) private addressHashes;
    
    // Her adresin toplam hash sayısını tutan mapping
    mapping(address => uint256) private hashCount;
    
    // Hash değerini kaydetmek için fonksiyon
    function storeHash(string memory _hash) public returns (uint256) {
        uint256 newId = hashCount[msg.sender];
        HashRecord memory newRecord = HashRecord({
            hashValue: _hash,
            timestamp: block.timestamp,
            id: newId
        });
        
        addressHashes[msg.sender].push(newRecord);
        hashCount[msg.sender]++;
        
        return newId;
    }
    
    // Belirli bir adresin tüm hash değerlerini almak için fonksiyon
    function getAllHashes(address _address) public view returns (HashRecord[] memory) {
        return addressHashes[_address];
    }
    
    // Belirli bir adresin belirli bir hash değerini ID ile almak için fonksiyon
    function getHashById(address _address, uint256 _id) public view returns (string memory hashValue, uint256 timestamp) {
        require(_id < hashCount[_address], "Hash ID does not exist");
        
        HashRecord[] memory records = addressHashes[_address];
        for (uint i = 0; i < records.length; i++) {
            if (records[i].id == _id) {
                return (records[i].hashValue, records[i].timestamp);
            }
        }
        
        revert("Hash not found");
    }
    
    // Bir adresin toplam hash sayısını almak için fonksiyon
    function getHashCount(address _address) public view returns (uint256) {
        return hashCount[_address];
    }
    
    // Gönderen adresin kendi son hash değerini almak için fonksiyon
    function getMyLatestHash() public view returns (string memory hashValue, uint256 timestamp) {
        require(hashCount[msg.sender] > 0, "No hashes stored");
        HashRecord[] memory myHashes = addressHashes[msg.sender];
        HashRecord memory lastHash = myHashes[myHashes.length - 1];
        return (lastHash.hashValue, lastHash.timestamp);
    }
}