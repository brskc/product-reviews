'use strict';

const config = require('../../config');
const controller = require('./baseController');
const Comment = require('../models/Comment');

controller.addComment = (req, res) => {
  let params = {};
  const {comment, header_id} = req.body;
  params.comment = comment;
  params.header_id = header_id;
  Comment.saveComment(params, (err, comment) => {
    if (err) return res.json({
      success: false,
      err: err
    });
    res.json({
      success: true,
      comment: comment
    });
  })
};

controller.updateComment = (req, res) => {
  let params = req.body;
  let id = req.body.id;
  Comment.updateComment(id, params, (err, newComment) => {

    if (err) return res.json({
      success: false,
      err: err
    }); else {
      if (newComment == null) return res.json({
        success: false,
        msg: 'comment not found'
      });
      res.json({
        success: true,
        msg: 'comment is update!!',
        newComment: newComment
      });

    }
  });
};

controller.deleteComment = (req, res) => {
  let id = req.body.id;
  Comment.deleteComment(id, (err, comment) => {

    if (err) return res.json({
      success: false,
      err: err
    }); else {
      if (comment == null) return res.json({
        success: false,
        msg: 'comment not found'
      });
      res.json({
        success: true,
        msg: 'comment is deleted!!'
      });
    }

  });
};

controller.getAllComment = (req,res) => {
  Comment.findAllComment((err, comments) => {
    if (err) return res.json({
      success: false,
      err: err
    }); else {
      return res.json({
        success: true,
        comments: comments
      });
    }
  })
};

module.exports = controller;
