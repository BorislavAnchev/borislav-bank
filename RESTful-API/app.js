const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const accountRoutes = require('./api/routes/accounts');

mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@anchevtestcluster-dd1yg.mongodb.net/test?retryWrites=true&w=majority', {
  // useMongoClient: true
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({}); // This whole thing ensures we prevend CORS errors, i.e. security errors because we are not requesting data from the same server.
  }
  next();
});

app.use('/accounts', accountRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: 'No such endpoint' // error.message
    }
  });
});

module.exports = app;