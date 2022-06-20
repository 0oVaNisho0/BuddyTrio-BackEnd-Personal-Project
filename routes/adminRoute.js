const express = require('express');
const upload = require('../middlewares/upload');

const adminController = require('../controllers/adminController');

const router = express.Router();

router.post(
  '/add',
  upload.fields([{ name: 'productPic', maxCount: 1 }]),
  adminController.addProduct
);
router.patch(
  '/update/:productId',
  upload.fields([{ name: 'productPic', maxCount: 1 }]),
  adminController.updateProduct
);
router.delete('/delete/:productId', adminController.deleteProduct);
router.patch('/recommend', adminController.changeRecommend);

module.exports = router;
