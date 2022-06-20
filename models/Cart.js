module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    Cart.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };
  return Cart;
};
