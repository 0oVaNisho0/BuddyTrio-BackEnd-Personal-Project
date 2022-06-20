const express = require('express');

const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', orderController.getUserOrder);
router.get('/item/:orderId', orderController.getOrderItemByOrderId);
router.post('/add', orderController.addOrder);
router.patch('/update', orderController.updateOrder);

module.exports = router;
