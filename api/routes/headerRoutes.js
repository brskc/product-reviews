'use strict';

const express = require('express');
const router = express.Router({});
const headerController = require('../controllers/headerController');
const auth = require('../middlewares/verify-token');

router.post('/add', auth.auth, headerController.addHeader);
router.post('/update', auth.auth, headerController.updateHeader);
router.post('/delete', auth.auth, headerController.deleteHeader);

module.exports = router;
