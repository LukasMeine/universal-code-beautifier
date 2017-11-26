module.exports = Formatter;
var utilities = require('../helpers/utils.js');
var utils = new utilities;
var exec = require('child_process').exec;
var fs = require('fs');
var tmp = require('tmp');
var utf8 = require('utf8');
const prettier = require("prettier");

function Formatter(request, res) {

  this.request = request;
  this.response = res;
  this.availableFormats = ['php', 'js', 'go','json','scss','less','ts','css','clj'];
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

function shell_exec(command,file,response,func)
{
  exec(command + file.name, function(error, stdout, stderr) {
    if (typeof error != null) {
      if(func == true)
      {
        remove_and_print(file,response);
      }
      else {
        overwrite(file,stdout,response)
      }
    }
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
  if (this.availableFormats.indexOf(lang_format) > -1) {
    let beautifier = this[lang_format](create_temp_file(content), this.response);

  } else {
    utils.response({
      status: 400,
      message: 'File extension not supported'
    }, this.response);
  }

}

Formatter.prototype.js = function(file, response) {

  fs.readFile(file.name, "utf8", function(err, data) {
    overwrite(file,prettier.format(data),response)
  });

}

Formatter.prototype.json = function(file, response) {

  fs.readFile(file.name, "utf8", function(err, data) {
    overwrite(file,prettier.format(data,{parser:"json"}),response)
  });

}

Formatter.prototype.less = function(file, response) {

  fs.readFile(file.name, "utf8", function(err, data) {
    overwrite(file,prettier.format(data,{parser:"less"}),response)
  });

}

Formatter.prototype.scss = function(file, response) {

  fs.readFile(file.name, "utf8", function(err, data) {
    overwrite(file,prettier.format(data,{parser:"scss"}),response)
  });

}

Formatter.prototype.ts = function(file, response) {

  fs.readFile(file.name, "utf8", function(err, data) {
    overwrite(file,prettier.format(data,{parser:"typescript"}),response)
  });

}

Formatter.prototype.css = function(file, response) {

  fs.readFile(file.name, "utf8", function(err, data) {
    overwrite(file,prettier.format(data,{parser:"css"}),response)
  });

}

Formatter.prototype.clj = function(file, response) {

  shell_exec("cljfmt ",file,response,true);
}


Formatter.prototype.php = function(file, response) {

  shell_exec("php-cs-fixer fix ",file,response,true);
}

Formatter.prototype.go = function(file, response) {

  shell_exec("gofmt ",file,response,false);
}
