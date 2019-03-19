const joi = require('joi');

const envVarsSchema = joi.object({
  MONGODB_URI: joi.string().required(),
  MONGODB_DB_NAME: joi.string().required(),
}).unknown().required();

const {error, value: envVars} = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  mongodb: {
    uri: envVars.MONGODB_URI,
    db: {
      name: envVars.MONGODB_DB_NAME,
    }
  }
};

module.exports = config;
