const { Product } = require('../models');

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ where: { id: productId } });

    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getRecommendProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({ where: { recommend: true } });

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};
