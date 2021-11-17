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


describe('Testing /signup routes', () => {

  let users = {
    username: 'username1',
    name: 'supertest1',
    password: 'password1',
    token: null
  }
  
  it('Should return a user and  a token', async () => {

    const response = await server.post('/signup').send(users);

    const userObject = response.body;

    console.log(userObject.user.username, '<-- CONSOLE LOG')

    expect(response.status).toBe(201)
    expect(userObject.user.username).toBe('username1')
    expect(userObject.user.name).toBe('supertest1')
    expect(userObject.user.password).toBeDefined()
    expect(userObject.user.token).toBeDefined()

  })
})
