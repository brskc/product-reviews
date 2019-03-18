'use strict';

const express = require('express');
const router = express.Router({});
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/verify-token');

router.post('/add', auth.auth , categoryController.addCategory);

module.exports = router;
