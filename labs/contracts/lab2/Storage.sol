pragma solidity ^0.4.10;

contract Storage {
    uint storedData;

    function set(uint x) {
        storedData = x;
    }

    function get() returns (uint retVal) {
        return storedData;
    }
}