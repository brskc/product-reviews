'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let categoryOrder = 'order',
  categoryFutbool = 'futbool',
  categoryBasketbool = 'basketbool';

let category = {
  order: categoryOrder,
  futbool: categoryFutbool,
  basketbool: categoryBasketbool
};



const HeaderSchema = new Schema({
  category: [category.order, category.futbool, category.basketbool],
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Header = module.exports = mongoose.model('header', HeaderSchema);

module.exports.saveHeader = (params, callback) => {
  let options = {
    setDefaultsOnInsert: true
  };
  const header = new Header(params);
  header.save(options,callback);

};

module.exports.updateHeader = (id,params, callback) => {
  Header.findOneAndUpdate({_id:id}, params, {new: true}, callback)
};

module.exports.deleteHeader = (id, callback) => {
  Header.findOneAndDelete({_id:id}, callback);
};

module.exports.findAllHeader = (callback) => {
  const promise = Header.aggregate([
    {
      $lookup: {
        from: 'comments',
        localField: "_id",
        foreignField: 'header_id',
        as: 'comments'
      }
    },
    {
      $unwind: {
        path: '$comments',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          category: '$category',
          name: '$name',
          createdAt: '$createdAt'
        },
        comments: {
          $push: '$comments'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        category: '$_id.category',
        name: '$_id.name',
        createdAt: '$_id.createdAt',
        comments: '$comments'
      }
    }
  ]);

  promise.then(data => {
    callback(data)
  }).catch(err => {
    callback(err)
  })
};
