'use strict';

const config = require('../../config');
const controller = require('./baseController');
const Product = require('../models/Product');

controller.addProduct = (req, res) => {
  const {name, category, image, price, comment, category_id} = req.body;
  const params = {};
  params.name =name;
  params.categpry_id = category_id;
  params.category = category;
  params.image = image;
  params.price = price;
  params.comment = comment;

  Product.saveProduct(params, (data, err) => {
    console.log(err);
    if (err){
      config.logger.log('error', 'Product save is failed !!'+ config.logger.error);
      return res.json({
        status: false,
        msg: 'Product save is failed !!'
      });
    }
    res.json(data);
  });
};

controller.getAllProduct = (req, res) => {
  Product.findAllProduct((data, err) => {
    if (err){
      config.logger.log('error', 'Product not found!!');
      return res.json({
        status: false,
        msg: 'Product save is failed !!'
      });
    }
    res.json(data);
  });
};

controller.between = (req, res) => {
  const params ={};
  const {start_year, end_year} = req.params;
  params.start_year = start_year;
  params.end_year = end_year;

  Product.between(params, (data, err) => {
    if (err){
      config.logger.log('error', 'Product not found !!');
      return res.json({
        status: false,
        msg: 'Product save is failed !!'
      });
    }
    res.json(data);
  });
};

module.exports = controller;
