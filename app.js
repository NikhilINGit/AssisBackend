var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDB = require('./config/connetion');
var indexRouter = require('./routes/index');
var dotenv = require("dotenv");
const cors = require("cors");
const serverless = require('serverless-http'); 

var app = express();


dotenv.config({ path: "./config/config.env" });

// Connect DB
connectDB();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
const allowedOrigins = ['http://localhost:3001', 'https://nimble-meerkat-d43bbd.netlify.app']; 

app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
}));


app.use('/', indexRouter);


app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports.handler = serverless(app); 
