'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Category = module.exports = mongoose.model('category', CategorySchema);

module.exports.saveCategory = (params, callback) => {
  let options = {
    setDefaultsOnInsert: true
  };
  const category = new Category(params);
  category.save(options,callback);

};

module.exports.findAllCategory = (callback) => {
  const promise = Category.find();
  promise.then((data) => {
    callback(data)
  }).catch((err) => {
    callback(err);
  });

};
