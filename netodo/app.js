var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todo');

const db = require('./db');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', todoRouter);

var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('my app listening on port ' + port + '!');
});

db.init().then(() => {
  console.log('Database init\'d');
}).catch(error => {
  console.log(error);
});
  

module.exports = app;
