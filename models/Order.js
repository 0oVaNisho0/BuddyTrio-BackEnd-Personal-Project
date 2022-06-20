const { FAILED, SUCCESS } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      status: {
        type: DataTypes.ENUM(FAILED, SUCCESS),
        allowNull: false,
        defaultValue: FAILED,
      },
    },
    {
      underscored: true,
    }
  );

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    Order.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Order;
};
