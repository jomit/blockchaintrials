pragma solidity ^0.4.10;

contract test {
    int _multiplier;
    function test(int multiplier) {
        _multiplier = multiplier;
    }

    function multiply(int a) returns (int r){
        return a *  _multiplier;
    }
}