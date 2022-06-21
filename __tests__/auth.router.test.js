'use strict';
const supertest = require('supertest');
const server = require('../models');
const { sequelize } = require('../models/index');
const mockRequest = supertest(server);


beforeAll (async () => {
  await sequelize.sync();
});

afterAll (async () => {
  await sequelize.close();
});

describe('Auth Tests', () => {

  test('Allows a user to signup with a POST to /signup', async () => {
    let response = await mockRequest.post('/signup').send({
      username: 'tester',
      password: 'pass123',
    });
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('tester');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('pass123');
  });

  test.todo('POST to /signin to login as a user (use basic auth)');

  test.todo('test3');

  test.todo('test4');

});
