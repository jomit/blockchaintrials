'use strict';

var common = require("../common");
var options = common.options;
var assert = common.assert;
var promise = common.promise;

var rewire = require('rewire');
var helper = rewire('../../app/lib/contract-helpers.js');
var keygen = rewire("../../app/lib/keygen.js");

var lw = require('eth-lightwallet');

var blockapps = common.blockapps;

var faucet = blockapps.routes.faucet;
var transaction = blockapps.ethbase.Transaction;
var ethValue = blockapps.ethbase.Units.ethValue;

describe('Multi-transactions', function() {

  var multiKeys = [];
  var n = 3;

  before("before #multiTXs", function(done){
    console.log("generating " + n + " private keys")
    for(var i = 0; i < n; i++){
      var kk = keygen.generateKeyPreWrite(options.password, options.username)
      multiKeys.push(kk);
            // keygen.writeKeyToDisk(options.username, kk, function(err, ret){
            //     done();
            // })
    }

    console.log('done generating keys')
    done()
  })

  describe('#identiTX()', function () {

    before("before #identiTX()", function(done){

      var keyStream = helper.userKeysStream(options.username);

      keyStream
              .pipe(helper.collect())
              .on('data', function (data) { 
                var d = JSON.stringify(data[0]);
                var store = lw.keystore.deserialize(d);
                var address = store.addresses[0];

                var privKey = store.exportPrivateKey(address, options.password);

                var tt = transaction({"value" : ethValue(13243).in("wei")});
                  // tt has r, s, v now
                console.log("privKey: " + privKey)
                tt.sign(privKey);

                var txs = [tt.send(privKey, "13243"), tt.send(privKey, "13243")]

                promise.all(txs).then(function(r){
                  console.log("tx " + address + " -> " + "13243")
                  console.log("sent 2 identical txs: " + JSON.stringify(r));
                  done();
                }) 
              })

    })
    it("identical TXs", function(done){
      assert(true) // should really test if api is up!
      done()
    })
  })

  describe('#identiTX-series()', function () {

    before("before #identiTX-series()", function(done){

      var keyStream = helper.userKeysStream(options.username);

      keyStream
              .pipe(helper.collect())
              .on('data', function (data) { 
                var d = JSON.stringify(data[0]);
                var store = lw.keystore.deserialize(d);
                var address = store.addresses[0];

                var privKey = store.exportPrivateKey(address, options.password);

                var tt = transaction({"value" : ethValue(13243).in("wei")});
                  // tt has r, s, v now
                tt.sign(privKey);

                tt.send(privKey, "13243").then(function(_) {
                  console.log("tx " + address + " -> " + "13243")
                }).then(function(){

                  tt.send(privKey, "13243").then(function(_) {
                    console.log("tx " + address + " -> " + "13243")
                  }).then(done);
                })   
              })

    })
    it("identical TXs (series)", function(done){
      assert(true) // should really test if api is up!
      done()
    })
  })

  describe('#pyramid()', function () {

    before(function(done){
      console.log("before pyramid")

      console.log("calling faucet " + n + " times sequentially")
      promise.reduce(multiKeys, function(total, addr) {
        console.log("faucet: " + addr.addresses[0])
        return faucet(addr.addresses[0])
      }, 0).then(function(_) {
        console.log("done calling faucet")
                //done()
      }).then(function(){

        console.log("initiating pyramid scheme")
        promise.reduce(multiKeys, function(total, key){
          return promise.map(multiKeys, function(addr){ 
            var addressTo = key.addresses[0];
            var privkeyFrom = addr.exportPrivateKey(addr.addresses[0], options.password);

            var randomVal = Math.round(Math.random()*1000)
                            
            var valueTX = transaction({"value" : ethValue(randomVal).in("wei")}); 

            return valueTX.send(privkeyFrom, addressTo).then(function(_) {
              console.log("tx " + addr.addresses[0] + " -> " + key.addresses[0])
                                //done();
            });
          }, 0).then(function(_) {
            console.log("done calling " + n + " txs")
                        //done()
          })

        }).then(function(){
          console.log("done sending pyramid transactions")
          done();
        })
      });
    })
    it("pyramid", function(){
      assert(true)
    })
  })
})  

// generate keys a...z

// #1: faucet -> a
// #2: faucet -> b, a -> b
// #3: faucet -> c, a -> b, b -> c
// #4: faucet -> d, a -> b, b -> c, c -> d

//  {faucet(a)}.transact()
// .then({faucet(b, send(a,b)}.transact())
// .then({faucet(c), send(a,b), send(b,c)}.transact())

// multisend(la){
//  fold(transact, 
// }


// {faucet, a}
// {faucet, b}, {a, b}
// {faucet, c}, {a, b}, {b, c}
// {faucet, d}, {a, b}, {b, c}, {c, d}


// l = [a...z]

