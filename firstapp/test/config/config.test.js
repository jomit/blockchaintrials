'use strict';

var common = require("../common");
var options = common.options;
var assert = common.assert;

var BigNumber = require('bignumber.js');

var blockapps = common.blockapps;
var Account = common.blockapps.ethbase.Account;

// try {
//     var config = yamlConfig.readYaml('config.yaml');
// } catch (e){
//     throw 'Cannot open config.yaml - are you in the project directory?';
// }

describe('setting up blockapps-js', function(){

  beforeEach(function(done){
    console.log("before config")
    done();
  });

  it('blockapps-js is v1.2', function(){
    assert(blockapps.query.apiPrefix == "/eth/v1.2")
  });

  describe('balanceTest', function() {
    var bal = new BigNumber(0);
    beforeEach(function(done){
      Account(options.address).balance.then(function(balance) {
        bal = balance;
        done();
      });
    });

    it('balance is non-zero', function() {
      console.log("balance of account (" + options.address + "): " + bal.toString())
      assert(bal.cmp(0) == 1);
    });

  });

});

