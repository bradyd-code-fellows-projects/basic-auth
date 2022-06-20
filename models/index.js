'use strict';

let base64 = require('base-64');
let bcrypt = require('bcrypt');

console.log('==================BASE 64========================');

let str = 'username:password';

let encoded = base64.encode(str);
let decoded = base64.decode(encoded);

console.log('str: ', str);
console.log('encoded: ', encoded);
console.log('decoded: ', decoded);

console.log('===============HASHING==========================');

let password1 = 'abc123';
let complexity1 = 5;

async function encrypt(password, complexity) {
  let hashedPass = await bcrypt.hash(password, complexity);
  let exampleOne = '$2a$05$CUE2QFUwCArrheh0KuyI.O26NEN4hJZ7egJ3oiRCXaWFli/CQHqPm';
  let isValidOne = await bcrypt.compare(password, hashedPass);
  console.log('isValidOne: ', isValidOne);
}

encrypt(password1, complexity1);