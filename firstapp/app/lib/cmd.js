'use strict';

var argv = require('yargs')
               .usage('Usage: $0 <command> (options)')
               .demand(1)

               .command('init [appName]', 'start a new project')
               .command('compile [contract]', 'compile contract in contract folder')
               .command('upload contract', 'upload contract to blockchain', {
                 user: { 
                   alias: 'u'
                 },
                 address: {
                   alias: 'a'
                 }
               })
               .default('u', 'admin')
               .command('genkey [user]', 'generate a new private key and fill it at the faucet, namespaced by user')
               .command('send', 'start prompt, transfer (amount*unit) to (address)')
               .command('start', 'start bloc as a webserver with live reload')
               .argv;

module.exports.argv = argv;
