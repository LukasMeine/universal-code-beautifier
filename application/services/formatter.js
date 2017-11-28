module.exports = Formatter;
var utilities = require('../helpers/utils.js');
var utils = new utilities;
var exec = require('child_process').exec;
var fs = require('fs');
var tmp = require('tmp');
var utf8 = require('utf8');
const prettier = require("prettier");
var pretty = require('pretty');

function Formatter(request, res) {

  this.request = request;
  this.response = res;
  this.availableFormats = ['php', 'js', 'go','json','scss','less','ts','css','clj','rb','html'];
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

function prettier_beautify(file,style,response)
{
  fs.readFile(file.name, "utf8", function(err, data) {
    overwrite(file,prettier.format(data,{parser:style}),response)
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
    let beautifier = this[lang_format](create_temp_file(content), this.response,content);

  } else {
    utils.response({
      status: 400,
      message: 'File extension not supported'
    }, this.response);
  }

}

Formatter.prototype.js = function(file, response, content) {

  prettier_beautify(file,"babylon",response);
}

Formatter.prototype.json = function(file, response, content) {

  prettier_beautify(file,"json",response);
}

Formatter.prototype.less = function(file, response, content) {

  prettier_beautify(file,"less",response);
}

Formatter.prototype.scss = function(file, response, content) {

  prettier_beautify(file,"scss",response);
}

Formatter.prototype.ts = function(file, response, content) {

  prettier_beautify(file,"typescript",response);
}

Formatter.prototype.css = function(file, response, content) {

  prettier_beautify(file,"css",response);
}

Formatter.prototype.clj = function(file, response, content) {

  shell_exec("cljfmt ",file,response,true);
}

Formatter.prototype.rb = function(file, response, content) {

  shell_exec("ruby-beautify --overwrite ",file,response,true);
}

Formatter.prototype.php = function(file, response, content) {

  shell_exec("php-cs-fixer fix ",file,response,true);
}

Formatter.prototype.html = function(file, response, content) {

  overwrite(file,pretty(content),response)
}

Formatter.prototype.go = function(file, response, content) {

  shell_exec("gofmt ",file,response,false);
}
