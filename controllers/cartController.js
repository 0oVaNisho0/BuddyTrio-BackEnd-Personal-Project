const { Cart, Product } = require('../models');
const createError = require('../utils/createError');

exports.getUserCart = async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          attributes: {
            exclude: ['createdAt'],
          },
        },
      ],
    });

    res.status(200).json({ carts });
  } catch (err) {
    next(err);
  }
};

exports.addCart = async (req, res, next) => {
  try {
    const { amount, productId } = req.body;

    const existCart = await Cart.findOne({
      where: { userId: req.user.id, productId },
    });

    if (existCart) {
      if (req.user.id !== existCart.userId) {
        createError('You have no permission', 400);
      }

      existCart.increment({ amount });
      res.json({ cart: existCart });
    } else {
      const cart = await Cart.create({
        amount,
        userId: req.user.id,
        productId,
      });
      res.json({ cart });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateCart = async (req, res, next) => {
  const { amount, productId } = req.body;

  const existCart = await Cart.findOne({
    where: { userId: req.user.id, productId },
  });

  if (!existCart) {
    createError('You have not add this product to cart', 400);
  }

  if (req.user.id !== existCart.userId) {
    createError('You have no permission', 400);
  }

  if (amount) {
    existCart.amount = amount;
  }

  await existCart.save();

  res.json({ cart: existCart });

  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteUserCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findOne({ where: { id: cartId } });

    if (!cart) {
      createError('Cart not found', 400);
    }

    if (req.user.id !== cart.userId) {
      createError('You have no permission', 400);
    }

    await cart.destroy();

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.deleteAllUserCart = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const carts = await Cart.findOne({ where: { userId } });

    if (!carts) {
      createError('Cart not found', 400);
    }

    if (req.user.id !== carts.userId) {
      createError('You have no permission', 400);
    }

    await Cart.destroy({ where: { userId } });

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
