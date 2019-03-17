const express = require('express');
const router = express.Router();

let userController = require('../controllers/userController');
let productController = require('../controllers/productController');
let categoryController = require('../controllers/categoryController');

// API PRIVATE
router.use('/api/user', require('./userRoutes'));
router.use('/api/product', require('./productRoutes'));
router.use('/api/category', require('./categoryRoutes'));

// PUBLIC
router.get('/', productController.getAllProduct);
router.get('/category', categoryController.getAllCategory);
router.post('/signup', userController.addUser);
router.post('/login', userController.authenticateUser);
router.get('/between/:start_year/:end_year', productController.between);


module.exports = router;
