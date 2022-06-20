'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3002;

const DATABASE_URL = process.env.NODE_ENV === 'test'
? 'sqlite::memory'
: process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UsersModel = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

UsersModel.beforeCreate = (user) => {
  console.log(user)
}

async function basicAuth(req, res, next) {
  let { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    res.status(401).send('Not Authorized');
  } else {
    let authStr = authorization.split(' ')[1];
    console.log('authStr: ', authStr);
    let decodedAuthStr = base64.decode(authStr);
    let [ username, password ] = decodedAuthStr.split(':');
    console.log('username: ', username);
    console.log('password: ', password);

    let user = await UsersModel.findOne({where: {username}});

    if (user) {
      let validUser = await bcrypt.compare(password, user.password);
      if (validUser) {
        req.user = user;
        next()
      } else {
        res.status(401).send('Not Authorized');
      }
    }
  }
}

app.post('/signup', async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let encryptedPass = await bcrypt.hash(password, 10);
    let newUser = await UsersModel.create({
      username,
      password: encryptedPass,
    });
    res.status(200).send(user);
  } catch(e) {
    res.status(500).send('Error')
  }
})

module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log(`listening on port:${PORT}`))
}