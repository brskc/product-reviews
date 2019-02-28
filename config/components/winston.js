'use strict';

const joi = require('joi');
const winston = require('winston');

const envVarsSchema = joi.object({
  WINSTON_LOG_LEVEL: joi.string().required(),
}).unknown().required();

const {error, value: envVars} = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

let options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }
};

let transports = [
  new winston.transports.Console(options.console)
];

let logger = winston.createLogger({
  transports: transports,
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

const config = {
  winston: {
    logger: logger,
    logLevel: envVars.WINSTON_LOG_LEVEL,
  }
};

module.exports = config;
