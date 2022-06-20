'use strict';

const { CUSTOMER, ADMIN } = require('../config/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nick_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      user_name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      profile_pic: {
        type: Sequelize.DataTypes.STRING,
      },

      role: {
        type: Sequelize.DataTypes.ENUM(CUSTOMER, ADMIN),
        allowNull: false,
        defaultValue: 'CUSTOMER',
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
    return queryInterface.dropTable('users');
  },
};
