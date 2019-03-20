'use strict';

const express = require('express');
const router = express.Router({});
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/verify-token');

router.get('/', commentController.getAllComment);
router.post('/add', auth.auth, commentController.addComment);
router.post('/update', auth.auth, commentController.updateComment);
router.post('/delete', auth.auth, commentController.deleteComment);

module.exports = router;
