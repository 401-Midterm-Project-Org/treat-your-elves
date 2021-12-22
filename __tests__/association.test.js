'use strict';

const { db } = require('../src/models');
const supertest = require('supertest');
const app = require('../src/server.js');
const server = supertest(app.server);

process.env.SECRET = 'secretstuffhere';

const jwt = require('jsonwebtoken');

beforeAll(async () => {
  await db.drop()
  await db.sync()
});

afterAll(async () => {
  await db.drop()
});

describe('Testing requests to /associations route', () => {

  let user1 = {
    username: 'username2',
    name: 'supertest2',
    password: 'password2',
  }

  let group = {
    groupName: 'name 1',
    groupAdminId: 1
  }

  it('Should create a group when a post request is made to /associations', async () => {

    await server.post('/signup').send(user1);

    const token = jwt.sign(user1, process.env.SECRET);

    await server
      .post('/groups')
      .send(group)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    let response = await server
      .post('/associations/1/1')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201)

  });

  let group2 = {
    groupName: 'name 2',
    groupAdminId: 1
  }

  it('Should create multiple group when more post requests are made to /associations', async () => {

   
    await server.post('/signup').send(user1);

    const token = jwt.sign(user1, process.env.SECRET);

    await server
      .post('/groups')
      .send(group2)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    let response = await server
      .post('/associations/2/1')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201)

  });

  it('Should find all associations when a get request is made to /associations', async () => {

    await server.post('/signup').send(user1);

    const token = jwt.sign(user1, process.env.SECRET);

    let response = await server
      .get('/associations')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)

  });


  it('Should find one group when a get request is made to /associations/:id', async () => {

    await server.post('/signup').send(user1);

    const token = jwt.sign(user1, process.env.SECRET);

    let response = await server
      .get('/associations/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)

  });

  it('Should remove a group when a delete request is made to /associations/:id', async () => {

    await server.post('/signup').send(user1);

    const token = jwt.sign(user1, process.env.SECRET);

    let response = await server
      .delete('/associations/1/1')
      .set('Authorization', `Bearer ${token}`)

      console.log(response.body, '<-- RESPONSE DOT BODY --<<')

    expect(response.status).toBe(200)

  });

});
