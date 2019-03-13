'use strict';

const controller = require('./baseController');
const Product = require('../models/Product');

controller.addProduct = (req, res) => {
  const {name, category, image, price, comment} = req.body;
  const params = {};
  params.name =name;
  params.category = category;
  params.image = image;
  params.user_id = req.user.id;
  params.price = price;
  params.comment = comment;

  Product.saveProduct(params, (data, err) => {
    console.log(err);
    if (data){
      config.logger.log('error', 'Product save is failed !!');
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
