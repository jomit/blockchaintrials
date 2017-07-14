'use strict';

try {
  var lw = require('eth-lightwallet');
}
catch(e) {
  console.log("Warning: eth-lightwallet not found.  Private keys will not be stored.");
}

var Promise = require('bluebird');
var fs = require("fs");
//var fs = Promise.promisifyAll(require("fs"));    
var faucet = require("blockapps-js").routes.faucet;

var path = require('path');
var chalk = require('chalk');
var mkdirp = Promise.promisifyAll(require('mkdirp'));

function generateKeyPreWrite(password,_){

  var seed = lw.keystore.generateRandomSeed();
  var store = new lw.keystore(seed, password);
  store.generateNewAddress(password);

  return store;
}

function writeKeyToDisk (userName, store, cb) {

  var keyPath = path.join('app', 'users', userName);
    //console.log("keyPath: " + keyPath)
  var fileName = path.join(keyPath, store.addresses[0]+'.json');

  var id = setInterval(function () { console.log(chalk.yellow("    ...waiting for transaction to be mined")); }, 2000);

  mkdirp(keyPath, function (_) { 
    fs.writeFile(fileName, store.serialize(), function(err){
      console.log("wrote " + fileName);
      faucet(store.addresses[0])
      .then(function (){
        console.log(chalk.green("transaction successfully mined!"));
        clearInterval(id);
        if(cb){
          cb(err, store);
        }
      });  
    });
  });
}

function generateKey (password,userName) { 
  var store = generateKeyPreWrite(password, userName)
  writeKeyToDisk(userName, store);
  return store;
} 

module.exports = {
  generateKey : generateKey,
  writeKeyToDisk: writeKeyToDisk,
  generateKeyPreWrite: generateKeyPreWrite
}