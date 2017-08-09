var Calculator = artifacts.require("./Calculator.sol");
var SpecialArrays = artifacts.require("./SpecialArrays.sol");

module.exports = function(deployer) {
  deployer.deploy(Calculator,10);  //pass initial contructor value 10 
  deployer.deploy(SpecialArrays);
};
