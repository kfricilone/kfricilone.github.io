const express = require('express');
const compression = require('compression');
const createError = require('http-errors');

const taylirRouter = require('./routes/taylir');
const springrsRouter = require('./routes/springrs');
const protectorRouter = require('./routes/protector');

const app = express();
app.use(compression());

// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/taylir/', taylirRouter);
app.use('/spring-rs/', springrsRouter);
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

app.listen(3000, () => {
  console.log(`kfricilone.me listening on 0.0.0.0:3000`)
})
