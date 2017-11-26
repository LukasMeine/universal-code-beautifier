module.exports = Formatter;
var utilities = require('../helpers/utils.js');
var utils = new utilities;
var exec = require('child_process').exec;
var fs = require('fs');
var tmp = require('tmp');
var utf8 = require('utf8');

function Formatter(request, res) {

  this.request = request;
  this.response = res;
  this.availableFormats = ['php', 'js', 'go'];
}

function overwrite(file,content,response)
{
  fs.truncate(file.name, 0, function() {

    fs.writeFile(file.name, content, function(err) {

      remove_and_print(file, response);

    });
  });
}

function remove_and_print(beautifier, res) {

  fs.readFile(beautifier.name, "utf8", function(err, data) {
    beautifier.removeCallback();
    utils.utf8_format(data, res);
  });
}

function create_temp_file(content) {
  var tmpobj = tmp.fileSync();
  fs.appendFileSync(tmpobj.name, content);
  return tmpobj;
}

Formatter.prototype.beautify = function() {

  let lang_format = this.request.body.extension;
  let content = this.request.body.content;
  if (this.availableFormats.indexOf(lang_format) > 0) {
    let beautifier = this[lang_format](create_temp_file(content), this.response);

  } else {
    utils.response({
      status: 400,
      message: 'File extension not supported'
    }, this.response);
  }

}

Formatter.prototype.go = function(file, response) {

  exec("gofmt " + file.name, function(error, stdout, stderr) {

    if (typeof error != null) {

      overwrite(file,stdout,response)
    }
  });
}