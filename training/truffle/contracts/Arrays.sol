pragma solidity ^0.4.8;

contract Arrays {

  // Elementary type array in storage
  int[3]     staticIntArray = [1,2];    //Last element set to 0
  int8[]     dynamicIntArray;
  bool[]     dynamicBoolArray;
  
  byte    byteType = 1;  // Byte type storage

  byte[120] bigArray; // byte array
  byte[]    byteData; // Dynamic byte array
  bytes8    bytes8Data; // Fixed length byte array  
  bytes     bytesData; // Dynamic byte array


  function testArrayOps() {

    dynamicBoolArray = new bool[](8);  // Allocate memory for 8 elements to the dynamic bool array

    // Allocate memory and initialize elements in the int array
    dynamicIntArray= [int8(1),2,3];  // Explicit conversion needed from uint8 to int8

    uint8[] memory memoryArray;  // This is good
    
    // memoryArray = [1,2,3];  // Allocation with assignment not allowed for memory arrays

    memoryArray = new uint8[](8);
    
    // memoryArray.push(1);  // This will give a compile error - push() not available for memory array
    // memoryArray.length=6; // This will give a compile error - cannot assign to length property for memory arrays
    
    byteData[0] = 8;  // This is OK

    // bytes8Data[6] = 0;  // This is not allowed - its READ Only

    bytesData[6] = 9;  // This is OK

    bytesData.length = 10;  // Dynamic array - bytes - These are OK
    bytesData.push(1);  // Dynamic array - bytes - These are OK
  }
}
