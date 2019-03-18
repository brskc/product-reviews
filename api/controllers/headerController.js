'use strict';

const config = require('../../config');
const controller = require('./baseController');
const Header = require('../models/Header');

controller.addHeader = (req,res) => {
  let params = {};
  const {name, category} = req.body;
  params.name = name;
  params.category = category;
  Header.saveHeader(params, (err, header) => {
    if (err) return res.json({
      success: false,
      err: err
    });
    res.json(header);
  })
};

controller.updateHeader = (req, res) => {
  let params = req.body;
  let id = req.body.id;
  Header.updateHeader(id, params, (err, newHeader) => {

    if (err) return res.json({
      success: false,
      err: err
    }); else {
      if (newHeader == null) return res.json({
        success: false,
        msg: 'header not found'
      });
      res.json({
        success: true,
        msg: 'header is update!!',
        newHeader: newHeader
      });
    }
  });
};

controller.deleteHeader = (req, res) => {
  let id = req.body.id;
  console.log(id);
  Header.deleteHeader(id, (err, header) => {

    if (err) return res.json({
      success: false,
      err: err
    }); else {
      if (header == null) return res.json({
        success: false,
        msg: 'header not found'
      });
      res.json({
        success: true,
        msg: 'header is deleted !'
      });
    }


  });
};

controller.getAllHeader = (req, res) => {
  Header.findAllHeader((err, headers) => {
    if (err) return res.json({
      success: false,
      err: err
    });

    res.json({
      success: true,
      headers: headers
    })
  })
};

module.exports =controller;
