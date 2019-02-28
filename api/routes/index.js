const express = require('express');
const router = express.Router();

let userController = require('../controllers/userController');
let productController = require('../controllers/productController');

// API PRIVATE
router.use('/api/user', require('./userRoutes'));
router.use('/api/product', require('./productRoutes'));

// PUBLIC
router.get('/', productController.getAllProduct);
router.post('/register', userController.addUser);
router.get('/authenticate', userController.authenticateUser);
router.get('/between/:start_year/:end_year', productController.between);


module.exports = router;
