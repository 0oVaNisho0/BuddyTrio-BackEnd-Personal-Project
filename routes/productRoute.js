const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProduct);
router.get('/recommend', productController.getRecommendProduct);
router.get('/:productId', productController.getProductById);

module.exports = router;
