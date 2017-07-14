var fs = require('fs');
var Solidity = require('blockapps-js').Solidity;
var path = require('path');
var mkdirp = require('mkdirp');
var chalk = require('chalk');

function compileSol(solSrc) {
  return Solidity(solSrc).then(function(solObj) {
    var multi = false;
    var dirs = [];
      
    if (typeof solObj.name === 'undefined' || solObj.name === '') {
      multi = true;
      dirs = Object.keys(solObj.src).map(function (contract) { 
        return path.join('app','meta', contract);
      });
    } else {
      dirs.push(path.join('app','meta', solObj.name));
    }
  
    console.log(chalk.yellow("Compile successful: " + solSrc));

    var theObj = {};

    /* unify object schemas */

    if (multi) { 
      theObj = solObj;
    } else {
      var name = solObj.name;
      var innerObj = {};

      innerObj[name] = solObj;
      theObj['src'] = innerObj;
    }

    dirs.map(function(contractPath) {
      mkdirp.sync(contractPath);
      for (contractName in theObj.src) {
        var contract = theObj.src[contractName];
        var multiPath = path.join(contractPath, contractName + '.json');

        console.log("writing " + contractName + " to " + multiPath)
        fs.writeFileSync(multiPath, contract.detach());
        console.log(chalk.green("wrote: ") + multiPath);
      }
    })
    
    return theObj;
  }).
  catch(function(e) {
    console.log("compile failed with error message: " + e);
  });
}

module.exports = compileSol;
