
/**
 * Get validator
 */
const joi = require('joi');

const envVarsSchema = joi.object({
  RECOVERY_EMAIL_NAME: joi.string().required(),
  RECOVERY_EMAIL_SECURITY: joi.string().required(),
  EMAIL_HOST_NAME: joi.string().required()
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  mail: {
    recoveryEmailName: envVars.RECOVERY_EMAIL_NAME,
    recoveryEmailSecurity: envVars.RECOVERY_EMAIL_SECURITY,
    emailHostName: envVars.EMAIL_HOST_NAME,
  }
};

module.exports = config;
