'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const DATABASE_URL = require('../../../models');
const sequelize = new Sequelize(DATABASE_URL);

const UsersModel = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UsersModel;
