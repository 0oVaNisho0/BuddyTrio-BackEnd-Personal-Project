const express = require('express');

const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

router.post('/credit-card', checkoutController.checkoutCreditCart);

module.exports = router;
