'use strict';

const express = require('express');
const router = express.Router({});
const userController = require('../controllers/userController');
const auth = require('../middlewares/verify-token');

router.get('/', userController.getUsers);
router.post('/update', auth.auth, userController.updateUser);
router.post('/signup', userController.addUser);
router.post('/login', userController.authenticateUser);

module.exports = router;
