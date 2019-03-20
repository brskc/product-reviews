'use strict';

const express = require('express');
const router = express.Router();

let userController = require('../controllers/userController');
let commentController = require('../controllers/commentController');
let headerController = require('../controllers/headerController');

// API PRIVATE
router.use('/api/v1/user', require('./userRoutes'));
router.use('/api/v1/comment', require('./commentRoutes'));
router.use('/api/v1/header', require('./headerRoutes'));






module.exports = router;
