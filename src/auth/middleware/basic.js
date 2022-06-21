'use strict';

const base64 = require('base-64');
const UsersModel = require('../auth/models/users-model');
const bcrypt = require('bcrypt');

async function basicAuth(req, res, next) {
  let { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    res.status(401).send('Not Authorized');
  } else {
    let authStr = authorization.split(' ')[1];
    console.log('authStr: ', authStr);
    let decodedAuthStr = base64.decode(authStr);
    let [username, password] = decodedAuthStr.split(':');
    console.log('username: ', username);
    console.log('password: ', password);

    let user = await UsersModel.findOne({ where: { username } });

    if (user) {
      let validUser = await bcrypt.compare(password, user.password);
      if (validUser) {
        req.user = user;
        next();
      } else {
        res.status(401).send('Not Authorized');
      }
    }
  }
}

module.exports = basicAuth;