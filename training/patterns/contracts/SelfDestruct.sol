pragma solidity ^0.4.4;

contract SelfDestruct {

  address         owner;
  string  public  someValue = "NOT-VALUE";

  modifier  OwnerOnly {
    if(msg.sender != owner){
      throw;
    } else {
      _;
    }
  }

  // Constructor
  function SelfDestruct() {
    owner = msg.sender;
  }

  // Sets the storage variable
  function  setValue(string value){
    someValue = value;
    
  }

  // This is where the contract is destroyed
  function  killContract()  OwnerOnly {
    //suicide(owner);
    selfdestruct(owner);
  }

}


