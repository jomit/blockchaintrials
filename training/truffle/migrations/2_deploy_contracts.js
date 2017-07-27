var Calculator = artifacts.require("./Calculator.sol");

module.exports = function(deployer) {
  deployer.deploy(Calculator,10);  //pass initial contructor value 10 
};
