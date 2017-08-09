pragma solidity ^0.4.4;

contract SpecialArrays {

  // Static or fixed length byte arrays
  byte[3]    fixedByteArray;  // Both declarations will create array with 3 byte elements
  bytes3     bytes3Array;  // Both declarations will create array with 3 byte elements
  // bytes64  byte4Array;  // Fails to compile as max size is 32 so only byte1...byte32 allowed

  // Dynamic bytes arrays
  byte[]    dynamicByteArray;
  bytes     bytesArray;

  string    stringStorage = "abcde"; // String variable

  // Converts the string to byte and sends the length of the string
  function  conversionTest() returns(string) {
    bytes   memory helloSolidity = "Hello Solidity!!!";
    string  memory converted = string(helloSolidity);
    return converted;
  }

  // Retrieves the element at specified index 
  function  getElementAt(uint index) returns(byte){
    bytes  memory bytesData = bytes(stringStorage);  // Convert string to bytes
    byte   element = bytesData[index];  // Get the element at the specified index
    return element;
  }


  function  testAssignment(){
    fixedByteArray = [byte(1),2,3];  // uint8 need to be explicitly converted to byte type
    fixedByteArray[0] = 5;

    // bytes3Array    = [byte(1),2,3];  // Assignment NOT allowed as bytes3Array is readonly
    // bytes3Array[0] = 1;  // Assignment NOT allowed as bytes3Array is readonly
    
    dynamicByteArray = new byte[](4);  // Dynamic Array created with new
    dynamicByteArray = [byte(1),2,3,4];
    dynamicByteArray[0] = 1;
    dynamicByteArray.length = 5;

    bytesArray = new bytes(4);  // Allocate 4 bytes for the dynamic bytes array
    // bytesArray = [byte(1),2,3,4];  // Fails to compile

    bytesArray[3] = 1;
    bytesArray.length = 5;

    bytes memory memoryBytes;  // Memory bytes
    memoryBytes = new bytes(20);
    memoryBytes[0]='a';
    
    // memoryBytes.push('c');  // Push will give compiler error as push() allowed for storage only
  }

  function stringLiterals(){
    
    // string pointer;  // Storage pointer must be initialized - so following will give an error
    string memory asciiString = "abcde";  
    string memory hexString = hex"01010A";
    
    // string memory hexString = hex"01010";  // This one would fail because of invalid hex value

    string memory escString = "\n";
    string memory utfHexString = '\x0101';
    string memory utfString = "\u0A0A";
    
    string memory some = new string(8);   // Allocate memory for 8 characters
    
    // some.push('a');  // Push for string not supporte - so this would fail
  
    // some[0] = 'a';  // Indexed access to string is not possible
  }
}