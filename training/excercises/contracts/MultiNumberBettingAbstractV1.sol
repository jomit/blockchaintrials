pragma solidity ^0.4.4;

contract MultiNumberBettingAbstractV1 {

  uint public constant MAX_BET=0.005 ether;
  uint public constant MIN_BET=0.000001 ether;

  function guess(uint8 num, string name) payable returns (bool);

  function totalGuesses() returns (uint);
  
  function daysSinceLastWinning()  returns (uint);

  function hoursSinceLastWinning() returns (uint);

  
  function  minutesSinceLastWinning() returns (uint);

  function getLastWinnerInfo() returns (address winnerAddress,
                                         string  name,
                                         uint    guess,
                                         uint    guessedAt,
                                         uint    ethersReceived);
                                         
  function checkWinning(address addr) returns(bool);
}
