var express = require("express");
var router = express.Router();
var utilities = require("../helpers/utils.js");
var statistics = require("../services/statistics.js");
var utils = new utilities();

router.get("/", function(req, res, next) {
  utils.response(
    { code: 200, message: "Universal code beautifier version 1.0.0" },
    res
  );
});

router.get("/badge", function(req, res, next) {
  let stats = new statistics(req, res);
  stats.display();
});

module.exports = router;