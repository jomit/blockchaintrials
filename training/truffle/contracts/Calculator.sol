pragma solidity ^0.4.6;

contract Calculator {

  uint result;

  function Calculator(uint initial) {
    result = initial;
  }

  function getResult() constant returns (uint) {
    return result;
  }

  function addToNumber(uint num) {
    result += num;
  }

  function subtractFromNumber(uint num) {
    result -= num;
  }

  function multiplyWithNumber(uint num) {
  }

  function divideNumberBy(uint num) {
  }

}