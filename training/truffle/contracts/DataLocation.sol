pragma solidity ^0.4.4;

contract DataLocation {

  uint[]  allPoints;  // Always in storage
  string  name;  // Always in storage

  //uint memory amount;  // These would give compilation error as here you can declare only storage vars
  //uint[] memory some;  // These would give compilation error as here you can declare only storage vars

  function  defaultAction(uint[] args) returns (uint[] dat) {
    //...code..
  }
  function  forcedAction(uint[] storage args) internal returns(uint[] storage dat) {
    //...code...
  }

  function testFunction(){
    
    // uint[]  localArray;  // This will give error as data location for array by default is "storage" 

    uint[]  memory   memoryArray;

    // By default value types are created in memory
    // But you may declare them as reference to storage
    // Changes to localName will be reflected in the storage va name
    string storage localName = name;

    // forcedAction(memoryArray);  // This will give error - requires array in storage

    defaultAction(memoryArray); // This is fine
    
    uint[]  pointer = allPoints;  // Creates a refernce
    
    forcedAction(pointer); // This is fine caz pointer is a reference to storage array
   
    defaultAction(pointer);  // This is fine too
  }

  function DataLocation() {
    // constructor
  }
}