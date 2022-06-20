const expree = require('express');

const cartController = require('../controllers/cartController');

const router = expree.Router();

router.post('/add', cartController.addCart);
router.put('/update', cartController.updateCart);
router.delete('/delete/:cartId', cartController.deleteUserCart);
router.delete('/delete/all/:userId', cartController.deleteAllUserCart);
router.get('/', cartController.getUserCart);

module.exports = router;
