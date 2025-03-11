const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/connetion');
const indexRouter = require('./routes/index');
const dotenv = require('dotenv');
const cors = require('cors');
const serverless = require('serverless-http'); 

const app = express();

dotenv.config({ path: './config/config.env' });

connectDB();


app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = ['http://localhost:3001','http://localhost:3001', 'https://nimble-meerkat-d43bbd.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false 
}));


app.options('*', cors());


app.use('/', indexRouter);


app.use((req, res, next) => next(createError(404)));


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
module.exports.handler = serverless(app); 
