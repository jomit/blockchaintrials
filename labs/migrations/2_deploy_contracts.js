var Storage = artifacts.require("./Storage.sol");
var Parent = artifacts.require("./Parent.sol");

module.exports = function(deployer) {
  deployer.deploy(Storage);
  deployer.link(Storage, Parent);
  deployer.deploy(Parent);
};
