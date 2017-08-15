pragma solidity ^0.4.0;

import "./Storage.sol";

contract Parent {

    mapping (bytes32 => address) public stores;

    function createNewStorage(bytes32 key){
        var store = new Storage();
        stores[key] = store;
    } 

    function getStorage(bytes32 key) constant returns (address) {
        return stores[key];
    }

}