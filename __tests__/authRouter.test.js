'use strict';

const { db } = require('../src/models');
const supertest = require('supertest');
const app = require('../src/server.js');
const server = supertest(app.server);

beforeAll( async () => {
  await db.sync()
});

afterAll( async () => {
  await db.drop()
});

describe('Testing /signup and /signin routes', () => {

  let users = {
    username: 'username1',
    name: 'supertest1',
    password: 'password1',
    token: null
  }
  
  it('Should return a user and a token when post request is made to /signup', async () => {

    const response = await server.post('/signup').send(users);
    const userObject = response.body;

    expect(response.status).toBe(201)
    expect(userObject.user.username).toBe('username1')
    expect(userObject.user.name).toBe('supertest1')
    expect(userObject.user.password).toBeDefined()
    expect(userObject.user.token).toBeDefined()

  });

  it('Should return a user and a token when post request is made to /signin', async () => {

    const response = await server.post('/signin').auth(users.username, users.password);
    const userObject = response.body;

    expect(response.status).toBe(200)
    expect(userObject.user.username).toBe('username1')
    expect(userObject.user.id).toBeDefined()
    expect(userObject.user.token).toBeDefined()

  });
});
