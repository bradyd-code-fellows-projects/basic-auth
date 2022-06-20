'use strict';
const supertest = require('supertest');
const server = require('../models/');
const { sequelize } = require('');
const mockRequest = supertest(server);


beforeAll (async () => {
  await sequelize.sync();
});

afterAll (async () => {
  await sequelize.drop();
});

describe('Auth Tests', () => {

  test('Allows a user to signup with a POST to /signup', async () => {
    let response = await mockRequest.post('/signup').send({
      username: 'tester',
      password: 'pass123'
    });
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('tester');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('pass123')
  });

  test.todo('test2');

  test.todo('test3');

  test.todo('test4');

})