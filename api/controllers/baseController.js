'use strict';

/**
 * Config
 */
const config = require('../../config');

/**
 * Services
 */
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports.denyAccessUnlessGranted = function (req, res) {
  return passport.authenticate('jwt', {
    failureRedirect: '/authfailurejson',
    session: false
  });
};

module.exports.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
