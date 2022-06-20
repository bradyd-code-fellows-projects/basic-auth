'use strict';

let { start, sequelize } = require('./src/server');

sequelize.sync()
  .then(() => console.log('successfully connected to database'))
  .catch((e) => console.error(e.message));

start();