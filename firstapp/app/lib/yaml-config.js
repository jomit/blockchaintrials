'use strict';

var yaml = require('js-yaml');
var fs = require('fs');

var defaultConfigObj = { 
  apiURL: 'http://strato-dev3.blockapps.net',
  appName: 'newproj',
  appURL: 'http://google.com',
  developer: 'kjl',
  email: 'kieren1@gmail.com',
  repo: '',
  profile: "strato-dev"
}

function writeYaml(filename, obj) {
  fs.writeFileSync(filename, yaml.safeDump(obj)); 
}

function readYaml(filename) {
  return yaml.safeLoad(fs.readFileSync(filename)); 
}

module.exports = {
  defaultConfigObj : defaultConfigObj,
  writeYaml : writeYaml,
  readYaml : readYaml
}
