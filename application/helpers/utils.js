//This library contains some functions meant to be reused across the entire project
module.exports = Utils;
var utf8 = require('utf8');
var log = require('captains-log')();

function Utils() {

}

Utils.prototype.response = function(content, res) {

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(utf8.encode(JSON.stringify(content,null, 4)));
}

Utils.prototype.utf8_format = function(content, res) {

    res.header("Content-Type", "text/plain; charset=utf-8");
    res.send(content);
}
