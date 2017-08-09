pragma solidity ^0.4.4;

contract BasicDataTypes {
   int num1;     // signed integers
                  // specified in 8 bit increments int8, int16, int32 . . . . 
                  // default int = int256 (so 32 bytes)
    uint8 num2;   //unsigned integers
    bool flag;

    address owner;
    uint ownerInitialBalance;

  function BasicDataTypes(address addr) {
    // constructor
    // if(1) {    }  fails compilation
    uint8 x8 = 255;  // uint8 x8 = 256; will fail due to implicit conversion and loss of information
    int x256;

    x256 = x8;
    // x8 = x256;  // fails compilation due to Implicit Type Conversion
    x8 = uint8(x256);   // Explicit Type Conversion

    var deduced = x8;  // Compiler automatically assigns the type uint8 to variable deduced.

    // deduced  = x256;  // fails compilation

    owner = addr;
    ownerInitialBalance = owner.balance;


  }
}
