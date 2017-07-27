var Calculator = artifacts.require("./Calculator.sol");

module.exports = function(deployer) {
  deployer.deploy(Calculator,500);
};
