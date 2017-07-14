'use strict';

var path = require('path');                                                                
var yaml = require('js-yaml');
var readdirp = require('readdirp');

var vinylFs = require( 'vinyl-fs' );
var map = require( 'map-stream' );
var stream = require('stream');  
var es = require('event-stream');
var merge = require('deepmerge');
var fs = require('fs');

/* utility */
var getContents = function(file, cb) {
  cb(null,file.contents);
};

var getPath = function(file, cb) {
  if(file.relative.includes('\\')) {
    var index = file.relative.lastIndexOf('\\');
    var val = file.relative.slice(index+1);
    cb(null,val);
  } else {
    cb(null,file.relative);
  }
};

// var getDir = function(file, cb) {
//   cb(null,file.cwd);    
// };

function contractNameStream(contractName) {
  return vinylFs.src( [ path.join('app', 'meta', contractName + '.json') ] )
      .pipe( map(getContents) );
}

function userNameStream() {
  return vinylFs.src( [ path.join('app', 'users','*') ] )
      .pipe( map(getPath) );
}
/* all contract names, just checking for their presence */
function contractsStream() {
  return vinylFs.src( [ path.join('app', 'contracts', '*.sol') ] )
      .pipe( map(getPath) );  
}

function contractDirsStream() { 
  return readdirp({root: path.join('app','meta'), depth: 1});
}

function contractAddressesStream(name) {
  return vinylFs.src( [ path.join('app', 'meta', name, '*.json') ] )
      .pipe( map(getPath) );  
}

function contractsMetaAddressStream(name,address) { 
  return vinylFs.src( [ path.join('app', 'meta', name, address + '.json') ] )
      .pipe( map(getContents) )
      .pipe( es.map(function (data, cb) {
        cb(null, JSON.parse(data))
      }));
}
/* emits all contract metadata as json */
function contractsMetaStream() { 
  return vinylFs.src( [ path.join('meta', '*.json') ] )
      .pipe( map(getContents) )
      .pipe( es.map(function (data, cb) {
        cb(null, JSON.parse(data))
      }));
}

/* emits config as json */
function configStream() {
  return vinylFs.src( [ './config.yaml' ] )
      .pipe( map(getContents) )
      .pipe( es.map(function (data, cb) {
        cb(null, yaml.safeLoad(data))
      }));
}

/* emit user keys */
function userKeysStream(user) {
  try {
    fs.statSync('./app/users/' + user);
  } catch(e) {
    //console.log("err: " + e)
    return null;
  }
  return vinylFs.src( [ path.join('app', 'users', user, '*.json') ] )
      .pipe( map(getContents) )
      .pipe( es.map(function (data, cb) {
        cb(null, JSON.parse(data))
      }));
}

function userKeysAddressStream(user,address) {
  return vinylFs.src( [ path.join('app', 'users', user, address + '.json') ] )
      .pipe( map(getContents) )
      .pipe( es.map(function (data, cb) {
        cb(null, JSON.parse(data))
      }));
}

/* emit all keys */
function allKeysStream() {
  return vinylFs.src( [ path.join('app', 'users','**','*','*.json') ] )
      .pipe( map(getContents) )
      .pipe( es.map(function (data, cb) {
        cb(null, JSON.parse(data))
      }));
}

// collects a bunch of data, makes an array out of it, and emits it 

function collect() {

  var a = new stream.Stream ()
    , array = [], isDone = false;
 
  a.write = function (l) {
    array.push(l);
  }

  a.end = function () {
    isDone = true;
    this.emit('data', array);
    this.emit('end');
  }

  a.writable = true;
  a.readable = true;

  a.destroy = function () {
    a.writable = a.readable = false;
    
    if (isDone) return;
  }

  return a;
}

function fuseStream() {
  var toFuse = [].slice.call(arguments);
  if (toFuse.length === 1 && (toFuse[0] instanceof Array)) {
    toFuse = toFuse[0];
  }

  var strm = new stream.Stream();
  strm.setMaxListeners(0);

  var endCount = 0;
  var dataObj = {};

  strm.writable = strm.readable = true;

  toFuse.forEach(function (e) {
    e.pipe(strm, {end: false});
    var ended = false;

    e.on('end', function () {
      if(ended) return;
      ended = true;
      endCount++;

      if(endCount == toFuse.length) {
        strm.emit('data', dataObj);
        strm.emit('end');
      }
    })
  })

  strm.write = function (data) {
    dataObj = merge(data,dataObj);
  }
  strm.destroy = function () {
    toFuse.forEach(function (e) {
      if(e.destroy) e.destroy()
    })
  }
  return strm;
}

function pendingForUser(username){
  var thepath = path.join('app', 'users', username, 'pending', '*.json');
  console.log('looking in : ' + thepath)
  return vinylFs.src( thepath )
  .pipe(map(getContents))
  .pipe( es.map(function (data, cb) {
    cb(null, JSON.parse(data))
  }));
}

function pendingForAddress(address){
  var thepath = path.join('app', 'pending', address, '*.json');
  console.log('looking in : ' + thepath)
  return vinylFs.src( thepath )
  .pipe(map(getContents))
  .pipe( es.map(function (data, cb) {
    cb(null, JSON.parse(data))
  }));
}

function txToJSON(t) {
  var result = {
    "nonce"      : t.nonce,
    "gasPrice"   : t.gasPrice,
    "gasLimit"   : t.gasLimit,
    "to"         : t.to ? t.to.toString(): "",
    "value"      : t.value,
    "codeOrData" : t.data ? t.data.toString("hex") : "",
    "from"       : t.from ? t.from.toString() : "",
    "r"          : t.r ? t.r.toString(16) : "",
    "s"          : t.s ? t.s.toString(16) : "",
    "v"          : t.v ? t.v.toString(16) : "",
    "hash"       : t.partialHash()
  }
  if (result.to == "") {
    delete result.to;
  }
  return result;
}

module.exports = {
  contractNameStream : contractNameStream,
  contractsStream : contractsStream,
  contractsMetaStream : contractsMetaStream,
  contractDirsStream : contractDirsStream,
  contractAddressesStream : contractAddressesStream,
  contractsMetaAddressStream : contractsMetaAddressStream,
  configStream : configStream,
  collect : collect,
  fuseStream : fuseStream,
  userNameStream : userNameStream,
  userKeysStream : userKeysStream,
  userKeysAddressStream : userKeysAddressStream,
  allKeysStream : allKeysStream,
  pendingForUser: pendingForUser,
  pendingForAddress: pendingForAddress,
  txToJSON: txToJSON
};
