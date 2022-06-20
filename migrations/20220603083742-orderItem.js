'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('order_items', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      amount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      discount: {
        type: Sequelize.DataTypes.INTEGER,
      },

      order_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'orders',
          },
          key: 'id',
        },
      },

      product_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'products',
          },
          key: 'id',
        },
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
    return queryInterface.dropTable('order_items');
  },
};
