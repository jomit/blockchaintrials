'use strict';

var express = require('express');
var cors = require('cors');
var router = express.Router();
var contractHelpers = require('../lib/contract-helpers.js');
// var lw = require('eth-lightwallet');
// var fs = require('fs');
// var mkdirp = require('mkdirp');
// var es = require('event-stream');
// var del = require('del');
// var rimraf = require('rimraf')
// var vinylFs = require( 'vinyl-fs' )
var _ = require('underscore')

router.get('/', cors(), function(req, res){
   //console.log(contractHelpers.allKeysStream())
  contractHelpers.allKeysStream()
      .pipe(contractHelpers.collect())
      .on('data', function(data) {
        var temp = _.map(data, function(v){
          return v.addresses;
        })
        res.send(JSON.stringify(_.flatten(temp)));
      });
});

router.get('/:address/pending', cors(), function(req, res){

  var address = req.params.address; 

  contractHelpers.pendingForAddress(address)
    .pipe(contractHelpers.collect())

    .on('data', function (data) {
      res.send(data);
    })
});

router.get('/:address/pending/remove/:time', cors(), function(req, _){

  var address = req.params.address; 
  var time = req.params.time;

  fs.unlink('app/pending/'+address+"/"+time+".json", function(_){
    console.log("removed a queue entry: " + time)
  })
});

module.exports = router;