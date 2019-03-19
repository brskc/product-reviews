'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  header_id: {
    type: Schema.Types.ObjectId,
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = module.exports = mongoose.model('comment', CommentSchema);

module.exports.saveComment = (params, callback) => {
  let options = {
    setDefaultsOnInsert: true
  };
  const comment = new Comment(params);
  comment.save(options, callback);
};

module.exports.updateComment = (id, params, callback) => {
  Comment.findOneAndUpdate({_id: id}, params, {new: true}, callback)
};

module.exports.deleteComment = (id, callback) => {
  Comment.findOneAndDelete({_id: id}, callback);
};

module.exports.findAllComment = (callback) => {
  Comment.find({}, callback);
};
