'use strict'

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var Solidity = require('blockapps-js').Solidity;

var path = require('path');
// var contractHelpers = require('./contract-helpers.js')

/**
 * Upload a contract by name.
 * @param {string} The name of the contract
 * @para {string} User's private key
 * @param {object} Constructor arguments
 * @return {array}
 */
function upload(contractName, privkey, argObj) { 
  console.log("upload contract: " + contractName)
  var compiledFile = path.join('app', 'meta', contractName, contractName + ".json");

  var id = setInterval(function () { console.log("    ...waiting for transaction to be mined"); }, 2000);

  var toRet = fs.readFileAsync(compiledFile, {encoding:"utf8"}).
    then(Solidity.attach).
    then(function(solObj) { 
   //   console.log("solObj after compilation: " + JSON.stringify(solObj))
      var toret;
      if (argObj.constructor === Object) {
        toret = solObj.construct(argObj);
      }
      else {
        toret = solObj.construct.apply(solObj, argObj);
      }
   //   console.log("toRet: " + JSON.stringify(contractHelpers.txToJSON(toret)))
      return toret.callFrom(privkey);  // txParams({"gasLimit":314159200})
    }).
    then(function(contrObj){
      var addr = contrObj.account.address.toString();
      var uploadedFile = path.join('app', 'meta', contractName, addr + ".json");
      var latestPath = path.join('app', 'meta', contractName, "Latest.json");

      console.log("writing: " + uploadedFile);
      console.log("writing: " + latestPath);
      clearInterval(id);

      var arr = [uploadedFile, latestPath, contrObj.detach(), addr];
      return Promise.join(
        fs.writeFileAsync(arr[0], arr[2]),
        fs.writeFileAsync(arr[1], arr[2])
        ).return(arr);
    })
   .catch(function (err) { 
     console.log("there was an error: " + JSON.stringify(err));
     clearInterval(id); 
     Promise.reject(JSON.stringify(err));
   });

  return toRet;
}

module.exports = upload;
