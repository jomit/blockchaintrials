'use strict';

var express = require('express');
var router = express.Router();
//var helper = require('../lib/contract-helpers.js');
//var es = require('event-stream');

router.get('/', function (req, res) {
  res.send('home page!');
});

module.exports = router;
