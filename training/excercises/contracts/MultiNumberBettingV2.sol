pragma solidity ^0.4.4;

contract MultiNumberBettingV2 {

  uint  loserCount;
  uint  winnerCount;

  string lastWinnerName ;

  uint8[3]  numArray;

  function MultiNumberBettingV2(uint8 num0, uint8 num1, uint8 num2) {
    numArray[0] = num0;
    numArray[1] = num1;
    numArray[2] = num2;
  }

  function guess(uint8 num, string name) returns (bool){
    for(uint8 i = 0 ; i < numArray.length ; i++){
      if(numArray[i] == num) {
        winnerCount++;
        lastWinnerName = name;
        return true;
      }
    }
    loserCount++;
    return false;
  }

  function totalGuesses() returns (uint){
    return (loserCount+winnerCount);
  }


  function getLastWinner() returns (string){

    bytes memory nameBytes = bytes(lastWinnerName);
    if(nameBytes.length == 0) return "***";

    string memory retString = new string(3);

    bytes memory toReturn =  bytes(retString);

    // cover a winner name less than 3 bytes
    for(uint i=0; (i < 3) && (i < nameBytes.length) ; i++){
      toReturn[i] = nameBytes[i];
    }

    return string(toReturn);
  }
  
}
