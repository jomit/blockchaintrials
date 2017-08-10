var SelfDestruct = artifacts.require("./SelfDestruct.sol");

module.exports = function(callback) {
    
    var  selfDestruct;

    return SelfDestruct.deployed().then(function(instance){
        selfDestruct = instance;  

        selfDestruct.setValue("Some Value");

        return selfDestruct.someValue.call(); 
    }).then(function(result){

        console.log("Value=", result);

        return selfDestruct.killContract();
    }).then(function(result){
        console.log("Contract Destroyed");
        // This call will throw an excepion as contract is destroyed
        selfDestruct.setValue("NEW Value");
        
    });
}


