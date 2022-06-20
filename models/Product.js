module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      recommend: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: true,
        },
      },

      productPic: DataTypes.STRING,

      productDetail: DataTypes.TEXT,
    },
    {
      underscored: true,
    }
  );

  Product.associate = (models) => {
    Product.hasMany(models.Cart, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    Product.hasMany(models.OrderItem, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Product;
};
