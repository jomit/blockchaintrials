pragma solidity ^0.4.4;

contract MultiNumberBettingV3 {

  uint public  loserCount;
  uint public  winnerCount;

  uint public lastWinnerAt;
  string lastWinnerName ;
  address winner;

  uint8[3]  numArray;

  function MultiNumberBettingV3(uint8 num0, uint8 num1, uint8 num2) {
    numArray[0] = num0;
    numArray[1] = num1;
    numArray[2] = num2;
  }

  
  function guess(uint8 num, string name) returns (bool){

    if(num > 10) throw;

    for(uint8 i = 0 ; i < numArray.length ; i++){
      if(numArray[i] == num) {
        winnerCount++;
        lastWinnerName = name;
        lastWinnerAt = now;

        winner=msg.sender;
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

    for(uint i=0; (i < 3) && (i < nameBytes.length) ; i++){
      toReturn[i] = nameBytes[i];
    }

    return string(toReturn);
  }

  function daysSinceLastWinning()  returns (uint){
    return (now - lastWinnerAt*1 days);
  }

  function hoursSinceLastWinning() returns (uint){
    return (now - lastWinnerAt*1 hours);
  }

  function  minutesSinceLastWinning() returns (uint){
    return (now - lastWinnerAt*1 minutes);
  }


  
}
