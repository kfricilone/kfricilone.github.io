var createError = require('http-errors');
var express = require('express');
var http = require('http');

var indexRouter = require('./routes/index');
var taylirRouter = require('./routes/taylir');
var protectorRouter = require('./routes/protector');

var app = express();
var server = http.createServer(app);

// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/taylir/', taylirRouter);
app.use('/protector/', protectorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =  {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', 3000);
server.listen(3000, 'localhost');
