'use strict';

var express = require('express');
var helper = require('../lib/contract-helpers.js');
var router = express.Router();
var Promise = require('bluebird');
var Solidity = require('blockapps-js').Solidity;

var cors = require('cors');
var traverse = require('traverse');
var es = require('event-stream')

require('marko/node-require').install();

var homeTemplate = require('marko').load(require.resolve('../components/home/home.marko'));
var contractTemplate = require('marko').load(require.resolve('../components/contracts/template.marko'));

/* accept header used */

router.get('/', cors(), function(req, res) {
  helper.contractDirsStream()
  .on('warn', function (err) { 
    console.error('non-fatal error', err); 
    // optionally call stream.destroy() here in order to abort and cause 'close' to be emitted
  })
  .on('error', function (err) { 
    console.error('no contracts compiled', err); 
    res.format(
      {
        html: function() {
          homeTemplate.render([], res);
        },

        json: function() {
          res.send(JSON.stringify([]));
        } 
      })
  })
  .pipe( helper.collect() )
  .pipe( es.map(function (data,cb) {

    var directoryTree = {};
    data.map(function (item) {
    
      var createdAt = Date.parse(item.stat.birthtime);
    
    // Windows split on '\'
      if (process.platform === 'win32') {
        var entries = item.path.split('\\');
      } else {
        var entries = item.path.split('/');
      }
      if (directoryTree[entries[0]] === undefined) { 
        directoryTree[entries[0]] = [];
      }
    // Remove .json 
      var address = entries[1].replace('.json', '');

      var contractObj = {
        "address": address,
        "createdAt": createdAt
      };

      if (contractObj.address != entries[0]) {
        directoryTree[entries[0]].push(contractObj);
      }
    //entries[0].sort(function(a, b) {return b - a});
    });

    cb(null,directoryTree);
  }))          
   .on('data', function (data) {
     res.format({
       html: function() {
         homeTemplate.render(data, res);
       },

       json: function() {
         res.send(JSON.stringify(data));
       } 
     })
   })
});

router.get('/:contractName', cors(), function (req, res) {
  var contractName = req.params.contractName;
  helper.contractAddressesStream(contractName)
      .pipe( helper.collect() )
      .pipe( es.map(function (data,cb) {
        var names = data.map(function (item) {
          return item.split('.')[0];
        });

        cb(null,JSON.stringify(names));
      }))
      .pipe(res)
});

/* accept header not used, explicit extension expected */

router.get('/:contractName/:contractAddress\.:extension?', function (req, res) {
  var contractName = req.params.contractName;
  var extension = req.params.extension;
  var contractAddress = req.params.contractAddress;

  console.log('extension was matched: ' + extension);

  var contractMetaAddressStream = helper.contractsMetaAddressStream(contractName,contractAddress)
      .pipe( helper.collect() )
      .pipe( es.map(function (data,cb) {
        var contractData = {};
        contractData.contractMeta = data[0];

        cb(null,contractData);
      }))
       
  var configStream = helper.configStream();
  var fusedStream = helper.fuseStream([configStream,contractMetaAddressStream])

  fusedStream
       .on('error', function (err) { 
         console.log("error, contract not found");
         res.send(err);
       })

       .on('data', function (data) {
         console.log("there's data!");
         if (typeof data.contractMeta === 'undefined') { 
           res.send("contract metadata not found");
           return;
         }

         if (extension === 'html') { 
           data.txFailedHandlerCode = "function txFailHandler(e) { $('#passwordModal').modal('show'); }";
           data.txFailedHandlerName = "txFailHandler";
           contractTemplate.render(data, res); 
         } else { 
           console.log('extension not html, assume json');
           res.send(JSON.stringify(data.contractMeta)); 
         }
       })
});


router.get('/:contractName/:contractAddress/functions', cors(), function (req, res) {
  var contractName = req.params.contractName;
  var contractAddress = req.params.contractAddress;
  var found = false;

  helper.contractsMetaAddressStream(contractName,contractAddress)
        .pipe( es.map(function (data,cb) {
          if (data.name == contractName) {
            found = true;
            var funcs = Object.keys(data.xabi.funcs);
            cb(null,JSON.stringify(funcs));
          }
          else cb();                      
        }))
        .on('error', function(err) { 
          console.log("error: " + err);
          res.send(err);
        })
        .on('data', function(data) { 
          res.send(data);
        })
        .on('end', function() {
          if (!found) res.send("contract not found"); 
        });
});

router.get('/:contractName/:contractAddress/symbols', cors(), function (req, res) {
  var contractName = req.params.contractName;
  var contractAddress = req.params.contractAddress;

  var found = false;

  helper.contractsMetaAddressStream(contractName,contractAddress)
        .pipe( es.map(function (data,cb) {
          if (data.name == contractName) {
            found = true;
            var funcs = Object.keys(data.xabi.vars);
            cb(null,JSON.stringify(funcs));
          }
          else cb();                      
        }))
        .on('error', function(err) { 
          console.log("error: " + err);
          res.send(err);
        })
        .on('data', function(data) { 
          res.send(data);
        })
        .on('end', function() {
          if (!found) res.send("contract not found"); 
        });
});

router.get('/:contractName/:contractAddress/state', cors(), function (req, res) {
  var contractName = req.params.contractName;
  var contractAddress = req.params.contractAddress;
    
  var found = false;

  helper.contractsMetaAddressStream(contractName,contractAddress)
      .pipe( es.map(function (data,cb) {
        if (data.name == contractName) { 
          found = true;
          cb(null,data);
        }
        else cb();                      
      }))

      .on('data', function(data) {
        var contract = Solidity.attach(data);
        return Promise.props(contract.state)
              .then(function(sVars) {

                var parsed = traverse(sVars).forEach(function (x) { 
                  if (Buffer.isBuffer(x)) { 
                    this.update(x.toString());
                  }
                });
                res.send(parsed);
              })

              .catch(function(err) { 
                console.log("contract/state sVars - error: " + err)
                res.send(JSON.stringify(err));
              });
      })

      .on('end', function () { 
        if (!found) res.send("contract not found");
      });

});

module.exports = router;
