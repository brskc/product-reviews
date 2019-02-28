'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = module.exports = mongoose.model('product', ProductSchema);

module.exports.saveProduct = function (params, callback) {

  const product = new Product(params);
  const promise = product.save();
  promise.then((data) => {
    callback(data)
  }).catch((err) => {
    callback(err);
  });
};

module.exports.findAllProduct = function (callback) {

  const promise = Product.find();
  promise.then((posts) => {
    callback(posts);
  }).catch((err) => {
    callback(err);
  });
};

module.exports.between = function (params, callback) {

  const promise = Product.find(
    {
      year: {"$gte": parseInt(params.start_year), "$lte": parseInt(params.end_year)}
    }
  );
  promise.then((product) => {
    if (!product)
      callback({msg: 'product not found!'});
    callback(product);
  }).catch((err) => {
    callback(err);
  });
};

