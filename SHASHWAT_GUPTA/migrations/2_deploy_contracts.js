var ToDo = artifacts.require("./ToDo.sol");
var Bank= artifacts.require("./Bank.sol");

module.exports = function(deployer) 
{
  deployer.deploy(ToDo);
  deployer.deploy(Bank);
};



