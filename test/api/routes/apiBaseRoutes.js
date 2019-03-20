'use strict';

const superagent = require('superagent');
const agent = superagent.agent();
const authenticationRoute = '/api/v1/user/login';

exports.loginUser = function (request, credentials, done) {
  request
    .post(authenticationRoute)
    .send(credentials)
    .end(function (err, res) {
      if (err) {
        done(err);
      }
      if (!res.body.hasOwnProperty('token')) {
        done(new Error('User could not log in!'))
      }
      done(null, res.body.token);
    });
};
