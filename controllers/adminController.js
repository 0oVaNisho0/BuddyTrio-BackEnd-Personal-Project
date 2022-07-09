const { Product } = require('../models');
const createError = require('../utils/createError');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.addProduct = async (req, res, next) => {
  try {
    const { name, price, quantity, productDetail } = req.body;

    if (req.user.role !== 'ADMIN') {
      createError('you have no permision', 400);
    }

    if (isNaN(+price)) {
      createError('price must be number', 400);
    }

    if (isNaN(+quantity)) {
      createError('quantity must be number', 400);
    }

    if (!req.files) {
      createError('productPic is required', 400);
    }

    let productPic;
    if (req.files.productPic) {
      const result = await cloudinary.upload(req.files.productPic[0].path);

      productPic = result.secure_url;
    }

    const product = await Product.create({
      name,
      price,
      quantity,
      productPic,
      productDetail,
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  } finally {
    if (req?.files?.productPic) {
      if (req?.files?.productPic[0]) {
        fs.unlinkSync(req.files.productPic[0].path);
      }
    }
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, price, quantity, productDetail } = req.body;
    const { productId } = req.params;

    if (req.user.role !== 'ADMIN') {
      createError('you have no permision', 400);
    }

    if (isNaN(+price)) {
      createError('price must be number', 400);
    }

    if (isNaN(+quantity)) {
      createError('quantity must be number', 400);
    }

    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      createError('product not found', 400);
    }

    if (req?.files?.productPic) {
      if (req.files.productPic !== product.productPic) {
        const splited = product.productPic.split('/');
        const publicId = splited[splited.length - 1].split('.')[0];
        await cloudinary.destroy(publicId);
        const result = await cloudinary.upload(req.files.productPic[0].path);
        product.productPic = result.secure_url;
      }
    }

    if (name) {
      product.name = name;
    }
    if (price) {
      product.price = price;
    }
    if (quantity) {
      product.quantity = quantity;
    }
    if (productDetail) {
      product.productDetail = productDetail;
    }

    await product.save();

    res.json({ product });
  } catch (err) {
    next(err);
  } finally {
    if (req?.files?.productPic) {
      if (req?.files?.productPic[0]) {
        fs.unlinkSync(req.files.productPic[0].path);
      }
    }
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (req.user.role !== 'ADMIN') {
      createError('you have no permision', 400);
    }

    if (!productId) {
      createError('productId not found', 400);
    }

    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      createError('product not found', 400);
    }

    if (product.productPic) {
      const splited = product.productPic.split('/');
      const publicId = splited[splited.length - 1].split('.')[0];
      await cloudinary.destroy(publicId);
    }

    await product.destroy();

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.changeRecommend = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (req.user.role !== 'ADMIN') {
      createError('you have no permision', 400);
    }

    if (!id) {
      createError('id not found', 400);
    }

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      createError('product not found', 400);
    }

    product.recommend = !product.recommend;

    await product.save();

    res.json({ product });
  } catch (err) {
    next(err);
  }
};
