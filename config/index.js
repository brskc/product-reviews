'use strict';

require('dotenv').config();
const _ = require('lodash');


const mongodb = require('./components/mongodb');
const winston = require('./components/winston');
const server = require('./components/server');
const jwt = require('./components/jwt');
const mail = require('./components/mail');

module.exports = _.merge({
  logger: winston.winston.logger,
}, winston, server, mongodb, jwt, mail);
