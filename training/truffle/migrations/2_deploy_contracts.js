var Calculator = artifacts.require("./Calculator.sol");
var SpecialArrays = artifacts.require("./SpecialArrays.sol");
var MappingEnumStruct = artifacts.require("./MappingEnumStruct.sol");
var FuncTypes = artifacts.require("./FuncTypes.sol");
var FuncTypesCaller = artifacts.require("./FuncTypesCaller.sol");
var ConstantsPayable = artifacts.require("./ConstantsPayable.sol");
var ObjectOrientation = artifacts.require("./ObjectOrientation.sol");

module.exports = function(deployer) {
  deployer.deploy(Calculator,10);  //pass initial contructor value 10 
  deployer.deploy(SpecialArrays);
  deployer.deploy(MappingEnumStruct);
  deployer.deploy(FuncTypes);
  deployer.deploy(FuncTypesCaller);
  deployer.deploy(ConstantsPayable);
  deployer.deploy(ObjectOrientation,"Jack",2.5);
};
