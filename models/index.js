'use strict';

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
// const UsersModel = require('../src/auth/models/users-model');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  sequelize,
  // UsersModel: UsersModel(sequelize, DataTypes),
};
