const { Order, OrderItem, Product, sequelize } = require('../models');
const createError = require('../utils/createError');

exports.getUserOrder = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });

    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderItemByOrderId = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const orderItems = await OrderItem.findAll({
      where: { orderId },
      include: [
        {
          model: Product,
          attributes: {
            exclude: ['createdAt'],
          },
        },
      ],
    });

    res.status(200).json({ orderItems });
  } catch (err) {
    next(err);
  }
};

exports.addOrder = async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { address, orderItems } = req.body;

    const order = await Order.create(
      { date: new Date(), address, userId: req.user.id },
      { transaction: t }
    );

    const fullOrderItem = orderItems.map((el) => ({
      ...el,
      orderId: order.id,
    }));

    const resOrderItems = await OrderItem.bulkCreate(fullOrderItem, {
      transaction: t,
    });

    await t.commit();

    if (resOrderItems) {
      order.orderItems = resOrderItems;
    }

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { address, status, orderId } = req.body;

    const order = await Order.findOne({ where: { id: orderId } });

    if (order.userId !== req.user.id) {
      createError('You have no permission', 400);
    }

    if (status) {
      order.status = status;
    }
    if (address) {
      order.address = address;
    }

    order.save();

    res.json({ order });
  } catch (err) {
    next(err);
  }
};
