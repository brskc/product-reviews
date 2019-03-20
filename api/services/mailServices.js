'use strict';

const aws = require('aws-sdk');
const nodemailer = require('nodemailer');
const config = require('../../config');

module.exports.transporter = function (user,pass) {
  return nodemailer.createTransport({
    direct:true,
    host: config.mail.emailHostName,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: user,
      pass: pass },

  });
};

