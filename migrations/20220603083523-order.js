'use strict';

const { FAILED, SUCCESS } = require('../config/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },

      status: {
        type: Sequelize.DataTypes.ENUM(FAILED, SUCCESS),
        allowNull: false,
        defaultValue: FAILED,
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
    return queryInterface.dropTable('orders');
  },
};
