var express = require('express');
var router = express.Router();
var formatter = require('../services/formatter.js');

router.post('/', function(req, res, next) {
  let format = new formatter(req,res);
  format.beautify();
});

module.exports = router;
