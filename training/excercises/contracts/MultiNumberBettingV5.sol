pragma solidity ^0.4.4;

import "./MultiNumberBettingAbstractV1.sol"  ;

contract MultiNumberBettingV5 is MultiNumberBettingAbstractV1 {

  uint public  loserCount;
  uint public  winnerCount;

  uint public lastWinnerAt;
  
  address winner;

  
  struct Winner {
    address winnerAddress;
    string  name;
    uint    ethersReceived;
    uint    guess;
    uint    guessedAt;
  }
  
  mapping(address=>Winner) winnersMapping;

  uint8[3]  numArray;

  function MultiNumberBettingV5(uint8 num0, uint8 num1, uint8 num2) {
    numArray[0] = num0;
    numArray[1] = num1;
    numArray[2] = num2;
  }

  function guess(uint8 num, string name) payable returns(bool)  {

    if(num > 10) throw;

    uint recvd = msg.value;
    if(recvd < MIN_BET || recvd > MAX_BET)  throw;

    for(uint8 i = 0 ; i < numArray.length ; i++){
      if(numArray[i] == num) {
        winnerCount++;

        winnersMapping[msg.sender].winnerAddress = msg.sender;
        winnersMapping[msg.sender].name = name;
        winnersMapping[msg.sender].guess = num;
        winnersMapping[msg.sender].guessedAt = now;
        winnersMapping[msg.sender].ethersReceived = msg.value;

        lastWinnerAt = winnersMapping[msg.sender].guessedAt;
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


  function daysSinceLastWinning()  returns (uint){
    return (now - lastWinnerAt*1 days);
  }

  function hoursSinceLastWinning() returns (uint){
    return (now - lastWinnerAt*1 hours);
  }

  function  minutesSinceLastWinning() returns (uint){
    return (now - lastWinnerAt*1 minutes);
  }

  function getLastWinnerInfo() returns(address winnerAddress, 
                                        string  name, 
                                        uint    guess,
                                        uint    guessedAt,
                                        uint    ethersReceived){
    winnerAddress = winnersMapping[winner].winnerAddress;
    name =  winnersMapping[winner].name;
    guess = winnersMapping[winner].guess;
    guessedAt = winnersMapping[winner].guessedAt;
    ethersReceived= winnersMapping[winner].ethersReceived;
  }

  function checkWinning(address addr) returns(bool){
    
    return true;
  }
  
}
