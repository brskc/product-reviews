let express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

const cors = require('cors');
const config = require('../config');

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.uri + config.mongodb.db.name, {
  useNewUrlParser: true,
});

app.set('api_secret_key', config.jwt.secret);

app.use(bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(require('./routes'));

app.use(function (req, res) {
  config.logger.log('warn', 'route:' + req.originalUrl + ' not found');
  res.status(404).send({route: req.originalUrl + ' not found'});
});

module.exports = app;
