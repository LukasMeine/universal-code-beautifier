var express = require('express');
var router = express.Router();
var utilities = require('../helpers/utils.js');
var utils = new utilities;

/* GET home page. */
router.get('/', function(req, res, next) {
  utils.response({ code:200, message: 'Universal code beautifier version 1.0' }, res);
});

module.exports = router;
