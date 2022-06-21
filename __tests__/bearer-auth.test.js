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

describe('Bearer auth tests', () => {
  test.todo('Bearer auth test1');
});
