'use strict';

const config = require('../../config');
const controller = require('./baseController');
const Category = require('../models/Category');

controller.addCategory = (req, res) => {
  const {name} = req.body;
  const params = {};
  params.name =name;

  Category.saveCategory(params, (err,category) => {
    if (err) {
      config.winston.logger.log('error', 'Saving category failed! Error:' + err.message);
      res.json({
        success: false,
        msg: "failed",
        error: err
      });
    } else {
      config.logger.log('info', 'New category added. category:' + category);

      res.json({
        success: true,
        category: category
      });
    }
  });
};

controller.getAllCategory = (req,res) => {
  Category.findAllCategory((data,err) => {
    if (err) res.json({success: false, err:err});
    res.json(data);
  });

};

module.exports = controller;
