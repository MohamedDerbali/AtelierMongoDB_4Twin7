var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const db = require("./db.json");
require("./models/contact")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');

var app = express();
//connection to DB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI || db.mongo.uri, {useNewUrlParser: true})
.then(()=> { console.log("connected to DB") })
.catch((err)=>{ console.log(err.message) });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});
const server = http.createServer(app);
server.listen(process.env.PORT || 5000, ()=>{
  console.log(`app is running on port ${process.env.PORT || 5000}`);
})