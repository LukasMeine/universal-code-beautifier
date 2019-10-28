const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const utilities = require('../helpers/utils.js');
const utils = new utilities;

const index = require('../routes/index');
const format = require('../routes/format');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false 
}));

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/format', format);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  if(typeof err.status === "undefined")
  {
    err.status = 500;
  }
    utils.response({ status: err.status, message: err.message }, res);
});

module.exports = app;
