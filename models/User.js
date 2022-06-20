const { CUSTOMER, ADMIN } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      nickName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      profilePic: DataTypes.STRING,

      role: {
        type: DataTypes.ENUM(CUSTOMER, ADMIN),
        allowNull: false,
        defaultValue: 'CUSTOMER',
      },
    },
    {
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Cart, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    User.hasMany(models.Order, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return User;
};
