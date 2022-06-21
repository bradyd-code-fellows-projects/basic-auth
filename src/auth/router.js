'use strict';

const express = require('express');
const UsersModel = require('../auth/models/users-model');
const basicAuth = require('../auth/middleware/basic');
const bcrypt = require('bcrypt');


const router = express.Router();

// UsersModel.beforeCreate = (user) => {
//   console.log(user);
// };

router.post('/signup', basicAuth, async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let encryptedPass = await bcrypt.hash(password, 10);
    let newUser = await UsersModel.create({
      username,
      password: encryptedPass,
    });
    res.status(200).send(newUser);
  } catch (e) {
    res.status(404).send('Cannot perform this method');
  }
});

router.post('/signin/', basicAuth, async (req, res, next) => {

});

module.exports = router;
