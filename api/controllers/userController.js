'use strict';

const config = require('../../config');
const controller = require('./baseController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

controller.addUser = (req, res) => {
  const params = {};
  const {username, email, password} = req.body;
  params.username = username;
  params.email = email;
  params.password = password;

  User.addUser(params, (user, err) => {
    if (err){
      config.logger.log('error', 'User save is failed !!');
      return res.json({
        err: err,
        status: false,
        msg: 'User save is failed !!'
      });
    }
    res.json({
      status: true,
      msg: 'user is saved',
      username: user.username,
      email: user.email
    });
  });

};

controller.getUsers = (req,res) => {
  User.findUsers((users) => {
    res.json(users);
  })
};

controller.authenticateUser = function (req, res) {
  config.logger.log('info', 'user authentication request received');
  /**
   * @todo: assert request params and don't pass them directly to the database query
   */
  let email = req.body.email;
  let password = req.body.password;
  User.getUserByEmail(email, (err, user) => {
    if (err) {
      config.logger.log('info', 'Finding user failed!');
      res.json({
        success: false,
        msg: 'User with this email address does not exist.'
      });
      return;
    }

    if (!user) {
      res.json({success: false, msg: 'User not found'});
      return;
    }

    User.comparePassword(user, password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        let userPayload = {
          _id: user._id,
          password: user.password
        };
        if (user.lastLoggedOutAt) {
          userPayload['lastLoggedOutAt'] = user.lastLoggedOutAt;
        } else
          userPayload['lastLoggedOutAt'] = null;

        const token = jwt.sign(userPayload, config.jwt.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'Bearer ' + token,
          user: user
        });
      } else {
        res.json({success: false, msg: 'Wrong password'});
      }
    })
  })
};

module.exports = controller;
