'use strict';

var common = require("../common");
var options = common.options;
var assert = common.assert;

var lw = require('eth-lightwallet');
var fs = require('fs')

var blockapps = common.blockapps;

var transaction = blockapps.ethbase.Transaction;
var ethValue = blockapps.ethbase.Units.ethValue;

var helper = require('../../app/lib/contract-helpers.js');
var upload = require("../../app/lib/upload.js")
var compile = require("../../app/lib/compile.js")

var privKey;
var address;

// var pairs = []
// var getPrivKeys = function(l, cb){
//   return promise.all(l.map(function(_){
//     var keyStream = helper.userKeysStream(options.username_multi);
//     return keyStream
//         .pipe(helper.collect())
//         .on('data', function (data) { 
//             var d = JSON.stringify(data[0]);
//             var store = lw.keystore.deserialize(d);
//             var tAddress = store.addresses[0];
//             var tPrivKey = store.exportPrivateKey(address, options.password); 
//             pairs.push((tAddress, tPrivKey));
//             console.log("pushed private key");
//         })
//   })).then(function(){console.log("done 3 keys"); cb();});
// }

var myUpload = function(name, argObj, cb){

  var solSrcFiles = "templates/app/contracts/" + name + ".sol"
  var src = fs.readFileSync(solSrcFiles).toString();

  compile(src).then(function(){

    var contractName = name;
    var keyStream = helper.userKeysStream(options.username);
    return keyStream
        .pipe(helper.collect())
        .on('data', function (data) { 
          var d = JSON.stringify(data[0]);
          console.log("data is " + d)
          var store = lw.keystore.deserialize(d);
          address = store.addresses[0];
          privKey = store.exportPrivateKey(address, options.password);
          upload(contractName, privKey, argObj)
             .then(function (solObjWAddr) {
                //console.log("contract address: " + solObjWAddr)
               console.log("calling callback");
               cb(solObjWAddr);
             });      
        })
  })
};

describe('compiling Payout', function(){

  var payOutSolWAddr = null;

  before(function(done){
    console.log("uploading Payout")
    myUpload("Payout", [], function(c){payOutSolWAddr = c; done()});
  });

  describe('#payoutTest()', function(){

    it("Payout is uploaded", function(){
      var contractAddress = JSON.parse(payOutSolWAddr[2]).address;
      console.log("Contract address: " + contractAddress)
      assert(contractAddress !== null)
    });

    it("Send some ether to Payout", function(done){
      var addressTo = JSON.parse(payOutSolWAddr[2]).address;
      var valueTX = transaction({"value" : ethValue(1).in("wei")}); 

      valueTX.send(privKey, addressTo).then(function(txResult) {
        console.log("txResult: " + JSON.stringify(txResult))
        console.log("tx " + address + " -> " + addressTo)
        done();
      });
    })

    it("Can call Payout", function(done){
      var payout = blockapps.Solidity.attach(payOutSolWAddr[2]);
      payout.state.Dividend().callFrom(privKey).then(function(_){
        done();
      })
    });
  });
});

describe('compiling SimpleMultiSig', function(){

  var smsSolWAddr = null;

  before(function(done){

    myUpload("SimpleMultiSig", [], function(c){smsSolWAddr = c; done()})
      
  });

  describe('#SimpleMultiSigTest()', function(){

    it("SimpleMultiSig is uploaded", function(){
      var contractAddress = JSON.parse(smsSolWAddr[2]).address;
      console.log("Contract address: " + contractAddress)
      assert(contractAddress !== null)
    });

    it("Send some ether to SimpleMultiSig", function(done){
      var addressTo = JSON.parse(smsSolWAddr[2]).address;
      var valueTX = transaction({"value" : ethValue(1).in("wei")}); 

      valueTX.send(privKey, addressTo).then(function(_) {
        console.log("tx " + address + " -> " + addressTo)
        done();
      });
    })

    it("Can call SimpleMultiSig", function(done){
      var sms = blockapps.Solidity.attach(smsSolWAddr[2]);
      sms.state.withdraw(address).callFrom(privKey).then(function(_){
        done();
      })
    });
  });

});

describe('compiling Greeter', function(){

  var greeterSolWAddr = null;

  before(function(done){
    console.log("uploading Greeter")
    myUpload("Greeter", ["Hello!"], function(c){greeterSolWAddr = c; done()});
  });

  describe('#payoutTest()', function(){

    it("Greeter is uploaded", function(){
      var contractAddress = JSON.parse(greeterSolWAddr[2]).address;
      console.log("Contract address: " + contractAddress)
      assert(contractAddress !== null)
    });

    it("Send some ether to Greeter", function(done){
      var addressTo = JSON.parse(greeterSolWAddr[2]).address;
      var valueTX = transaction({"value" : ethValue(1).in("wei")}); 

      valueTX.send(privKey, addressTo).then(function(txResult) {
        console.log("txResult: " + JSON.stringify(txResult))
        console.log("tx " + address + " -> " + addressTo)
        done();
      });
    })

    it("Can call Greeter", function(done){
      var payout = blockapps.Solidity.attach(greeterSolWAddr[2]);
      payout.state.greet().callFrom(privKey).then(function(greeting){
        console.log(greeting);
        done();
      })
    });
  });
});
