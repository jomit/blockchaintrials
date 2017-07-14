'use strict';

var common = require("./common");
var yaml = require('js-yaml');

describe("top", function () {
  beforeEach(function(done){

    var profile;

    try {
      var config = yaml.safeLoad(fs.readFileSync('config.yaml'));
      var apiURI = config.apiURL;
      profile = ["strato-dev", apiURI];
    } catch (e){
      profile = ["strato-dev", "http://strato-dev4.blockapps.net"]
    }

    common.blockapps.setProfile(profile[0], profile[1]);
    console.log("using: " + profile)
    done();
  });

  common.importTest("config", './config/config.test.js');
  common.importTest("keygen", './keygen/keygen.test.js');
  common.importTest("contract", './contract/contract.test.js');
  common.importTest("multi", './multi/multi.test.js');

  after(function () {
    console.log("after all tests");
  });
});
