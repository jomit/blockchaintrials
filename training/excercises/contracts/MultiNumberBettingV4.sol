pragma solidity ^0.4.4;

contract MultiNumberBettingV4 {

  uint public  loserCount;
  uint public  winnerCount;

  uint public lastWinnerAt;

  address winner;

  struct Winner {
    address winnerAddress;
    string  name;
    uint    guess;
    uint    guessedAt;
  }
  mapping(address=>Winner) winnersMapping;

  uint8[3]  numArray;

  function MultiNumberBettingV4(uint8 num0, uint8 num1, uint8 num2) {
    numArray[0] = num0;
    numArray[1] = num1;
    numArray[2] = num2;
  }

  
  function guess(uint8 num, string name) returns (bool){
    if(num > 10) throw;

    for(uint8 i = 0 ; i < numArray.length ; i++){
      if(numArray[i] == num) {
        winnerCount++;

        winnersMapping[msg.sender].winnerAddress = msg.sender;
        winnersMapping[msg.sender].name = name;
        winnersMapping[msg.sender].guess = num;
        winnersMapping[msg.sender].guessedAt = now;


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

  function getLastWinnerInfo() returns (address winnerAddress,
                                         string  name,
                                         uint    guess,
                                         uint    guessedAt){
    winnerAddress = winnersMapping[winner].winnerAddress;
    name =  winnersMapping[winner].name;
    guess = winnersMapping[winner].guess;
    guessedAt = winnersMapping[winner].guessedAt;
  }

  function checkWinning(address addr) returns(bool){
    //return (winnersMapping[addr].guessedAt != 0);
    return true;
  }
  
}
