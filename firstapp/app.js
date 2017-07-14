var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var home = require('./app/routes/home.js');
var users = require('./app/routes/users.js');
var addresses = require('./app/routes/addresses.js');
var contracts = require('./app/routes/contract.js');

var helper = require('./app/lib/contract-helpers');
var api = require('blockapps-js');
var Solidity = require('blockapps-js').Solidity;
var Promise = require('bluebird');

var yaml = require('js-yaml');
var fs = require('fs');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var _ = require('underscore');

app.use(logger('dev'));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(session({resave: true, 
                 saveUninitialized: true,
                 secret: 'session-to-track-global-wallet-pass-in-memory', 
                 cookie: { maxAge: 60000 }}));

app.use('/', home);
app.use('/users', users); 
app.use('/addresses', addresses);
app.use('/contracts', contracts);

app.use('/static', express.static('app/static'));
app.use('/images', express.static('images'));

var port = process.env.PORT || 8000;
var host = process.env.HOST || '0.0.0.0';

var config = yaml.safeLoad(fs.readFileSync('config.yaml'));
var apiURI = config.apiURL;
              
api.setProfile(config.profile, apiURI);
api.query.serverURI = process.env.API || apiURI;

http.listen(port, host, function () {
// var server = app.listen(3001, 'localhost', function () {
//   var host = server.address().address;
//   var port = server.address().port;
  
  console.log('bloc is listening on http://%s:%s', host, port);
  console.log('api is pointed to ' + config.apiURL + " with profile " + config.profile)
});

var contractState = io.of('/contracts/state');

contractState.on('connection', function(socket) { 
  console.log("a user connected");
  console.log("the namespace was: " + JSON.stringify(Object.keys(socket.nsp)));
  console.log("the namespace name was: " + JSON.stringify(socket.nsp.name));
 
  console.log("the handshake was: " + JSON.stringify(Object.keys(socket.handshake)));
  console.log("the handshake url was: " + JSON.stringify(socket.handshake.url));
  console.log("the handshake query was: " + JSON.stringify(socket.handshake.query));

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
   
  createStateStream(socket);
});

function emitStateIfChange(sock,contract,oldState,callback) { 
  Promise.props(contract.state).then(function(sVars) {
    if (! _.isEqual(oldState,sVars) && !(JSON.stringify(oldState) === JSON.stringify(sVars))) { 
      sock.emit('current state', sVars);
      console.log("it's different!");
      console.log("oldState: " + JSON.stringify(oldState));
      console.log("newState: " + JSON.stringify(sVars));
    } else {                     
      console.log("still subscribed, no change");
    }
 
    if (sock.connected) { 

      setTimeout( 
              callback(sock,contract,sVars,callback)
              , 1000
           );
    }
  });
} 

function createStateStream(sock) {
  helper.contractsMetaAddressStream(sock.handshake.query.contractName,sock.handshake.query.contractAddress)
      .pipe( es.map(function (data,cb) {
        if (data.name == sock.handshake.query.contractName) cb(null,data);
        else cb();
      }))

      .on('data', function(data) {
        var contract = Solidity.attach(data);
          
        emitStateIfChange(sock,contract,{},emitStateIfChange);
      });
}
