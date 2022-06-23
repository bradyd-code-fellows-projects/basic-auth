'use strict';

const express = require('express');
const UsersModel = require('../auth/models/users-model');
const basicAuth = require('../auth/middleware/basic');
const base64 = require('base-64');
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
    res.status(200).json(newUser);
  } catch (e) {
    res.status(404).send('Cannot perform this method');
  }
});

router.post('/signin/', basicAuth, async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password
  try {
    const user = await UsersModel.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login'); }
});

module.exports = router;
