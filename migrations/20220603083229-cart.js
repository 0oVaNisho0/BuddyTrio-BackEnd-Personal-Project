'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('carts', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      amount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
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
    return queryInterface.dropTable('carts');
  },
};
