pragma solidity ^0.4.0;

contract Storage {

  function Storage() {
  }

  mapping(bytes32 => uint) UIntStorage;

  function getUIntValue(bytes32 record) constant returns (uint) {
    return UIntStorage[record];
  }

  function setUIntValue(bytes32 record, uint value){
    UIntStorage[record] = value;
  }

}
