var fs = require("fs");
const file_name = "./application/includes/stats.txt";
var utilities = require("../helpers/utils.js");
var request = require("request");
var utils = new utilities();
module.exports = Statistics;

function Statistics(request, res) {
  global.request = request;
  global.response = res;
}

Statistics.prototype.add = function() {
  read_file(file_name, "overwrite");
};

Statistics.prototype.display = function() {
  read_file(file_name, "print");
};

function read_file(file_name, operation) {
  fs.readFile(file_name, "utf8", function(err, data) {
    global[operation](file_name, data);
  });
}

global.print = function(file_name, data) {
  request(
    "https://img.shields.io/badge/beautified-"+data.trim()+"%20files-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA0AAAASCAQAAAAqYpy5AAAA70lEQVQY023RPS5EARTF8TMfjc8oNEKtE5nCHiQWoFZIxAZ0NqASiUqjtARREVqJWkRBIxHMSIiZee%2BnGA8j7i1P7j%2FnnhPX9jRFQwb7Pd5xYl401IZEbSUerIqo%2F7rVQQ%2FsGhsC64BCgQsLP%2BBKgi5erFXgSmrr4gMcmBL16ChxYtn9N%2FjSksSzvsKZmHGoVOihbbmZ8TSSTCR5ykOSWmqRyczFqTu3trVcodTDqw3NGDVh2pZXdJU41xqYj3nHfPkr7RgdPB7rHtHTx42Vn7jy658js0Mhe1GgbVP%2BVOMNpxZFvcq9KuXavpH%2FqvwEzYI0hSs7EJ8AAAAASUVORK5CYII%3D",
    function(error, response, body) {
      global.response.send(body);
    }
  );
};

global.overwrite = function(file_name, data) {
  count = Number(data);
  count++;
  fs.truncate(file_name, 0, function() {
    fs.writeFile(file_name, count, function(err) {});
  });
};
