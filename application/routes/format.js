var express = require('express');
var router = express.Router();
var formatter = require('../services/formatter.js');
var statistics = require("../services/statistics.js");

router.post('/', function(req, res, next) {
  let format = new formatter(req,res);
  let stats = new statistics(req, res);
  stats.add();
  format.beautify();
});

module.exports = router;
