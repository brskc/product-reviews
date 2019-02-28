'use strict';

/**
 * Get validator
 */
const joi = require('joi');

const envVarsSchema = joi.object({
  JWT_SECRET: joi.string().required()
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  jwt: {
    secret: envVars.JWT_SECRET
  },
};

module.exports = config;
