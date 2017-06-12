import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
// import favicon from 'serve-favicon';
import path from 'path';
import lessMiddleware from 'less-middleware';
import index from './routes/index';

// create user
import Airport from './models/airport';
import Flight from './models/flight';
import Terminal from './models/terminal';
import Passenger from './models/passenger';

const app = express();
const debug = Debug('airport:app');

// connect to mongoDB
mongoose.connect('mongodb://localhost/airport');

let flight1 = new Flight({
  from: 'CDG France',
  to: 'JFK New-York, USA',
  airline: 'American Airlines',
  passengers: []
});

flight1.save((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(flight1);
  console.log('Flight saved');
});

let flight2 = new Flight({
  from: 'Heathrow UK',
  to: 'JFK New-York, USA',
  airline: 'British Airways',
  passengers: []
});

flight2.save((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(flight2);
  console.log('Flight saved');
});

let airport1 = new Airport({
  name: 'JFK',
  country: 'US',
  terminals: [],
  opened: ((new Date()).setYear(1990))
});

airport1.save((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(airport1);
  console.log('Airport saved');
});

let terminal1 = new Terminal({
  name: 'Terminal 1',
  flights: [],
  capacity: 234324
});

terminal1.save((err) => {
  if (err) {
    console.log(err);
    return;
  }
  terminal1.flights.push(flight1);
  terminal1.flights.push(flight2);
  console.log(terminal1);
  console.log('Terminal saved');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
