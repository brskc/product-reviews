'use strict';

const express = require('express');
const router = express.Router({});
const productController = require('../controllers/productController');
const auth = require('../middlewares/verify-token');

router.post('/add',auth.auth, productController.addProduct);

module.exports = router;
