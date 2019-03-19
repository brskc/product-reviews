'use strict';

const config = require('../../config');
const controller = require('./baseController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

controller.addUser = function (req, res) {
  config.logger.log('info', 'Add user requested.');
  let newUser = new User(req.body);
  newUser.createdAt = new Date();
  let email = req.body.email;
  User.getUserByEmail(email, (err, user) => {
    if (user) {
      res.json({
        success: false,
        msg: 'A user with this email address already exists',
        username: user.username
      });
    } else {
      User.saveUser(newUser, (err, user) => {
        if (err) {
          config.winston.logger.log('error', 'Saving user failed! Error:' + err.message);
          res.json({
            success: false,
            msg: "failed",
            error: err
          });
        } else {
          let userPayload = {
            _id: user._id,
            lastLoggedOutAt: null
          };
          const token = jwt.sign(userPayload, config.jwt.secret, {
            expiresIn: 604800 // 1 week
          });
          config.logger.log('info', 'New user added. Username:' + user.username);
          res.json({
            success: true,
            token: token,
            user: user
          });
        }
      });
    }
  });
};

controller.getUsers = (req, res) => {
  User.findUsers((users) => {
    res.json(users);
  })
};

controller.updateUser = function (req, res) {
  config.logger.log('info', 'Update user requested.');
  let user = req.decode;
  let userUpdated = req.body;
  User.updateUser(user._id, userUpdated, (err, userSaved) => {
    if (err) {
      config.logger.log('error', 'User update failed! error:' + err.message);
      return res.json({
        success: false,
        msg: err
      });
    }
    if (userSaved == null) {
      return res.json({
        success: false,
        msg: 'user not found'
      });
    }
    config.logger.log('info', 'User updated successfully.');
    return res.json({
      success: true,
      msg: 'User updated successfully!',
      user: userSaved
    });
  });
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
          token: token,
          user: user
        });
      } else {
        res.json({success: false, msg: 'Wrong password'});
      }
    })
  })
};

module.exports = controller;
