'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      recommend: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: true,
        },
      },

      product_pic: {
        type: Sequelize.DataTypes.STRING,
      },

      product_detail: {
        type: Sequelize.DataTypes.TEXT,
      },

      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('products');
  },
};
