'use strict';

const express = require('express');
require('dotenv').config();
const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');

const router  = require('./auth/router');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('This is the server for Brady\'s Code 401 lab06, basic-auth');
});

app.use(router);

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log(`listening on port:${PORT}`)),
};
