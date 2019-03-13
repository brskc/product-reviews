'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = module.exports = mongoose.model('user', UserSchema);

module.exports.updateUser = function (userId, userUpdated, callback) {
  userUpdated.updatedAt = new Date();
  User.findOneAndUpdateWithDeleted({'_id': userId}, userUpdated, {}, callback);
};

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.findUsers = (callback) => {

  const promise = User.find();
  promise.then((users) => {
    callback(users)
  }).catch((err) => {
    callback(err);
  });

};

module.exports.getUserByEmail = function (email, callback) {
  const query = {'email': email};
  User.findOne(query, callback);
};

const generatePassword = function(user,callback){
  bcrypt.genSalt(10, (err, salt) => {
    if (err) callback(err, null);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return err;
      user.password = hash;
      callback(user)
    });
  });
};

module.exports.saveUser = (user, callback) => {
  generatePassword(user, (data) => {
    let options = {
      setDefaultsOnInsert: true
    };
    const newUser = new User(data);
    newUser.save(options, callback);
  });
};

module.exports.comparePassword = function (user, candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) callback(err, null);
    if (!isMatch) {
      // If user password stored as plain text, save it as hash
      if (candidatePassword.trim() === hash.trim()) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) callback(err, null);
          bcrypt.hash(candidatePassword, salt, (err, hashedPassword) => {
            if (err) callback(err, null);
            user.password = hashedPassword;
            user.save(function (err, user) {
              if (err) throw err;
              callback(null, true);
            });
          });
        });
      } else
        callback(null, isMatch);
    } else
      callback(null, isMatch);
  });

};
