'use strict';

const { db } = require('../src/models');
const supertest = require('supertest');
const app = require('../src/server.js');
const server = supertest(app.server);
const jwt = require('jsonwebtoken')

process.env.SECRET = 'secretstuffhere'

beforeAll( async () => {
  await db.sync()
});

afterAll( async () => {
  await db.drop()
});

describe('Testing requests to /listItem route', () => {

  let user1 = {
    username: 'username1',
    name: 'supertest1',
    password: 'password1',
    token: null,
  }

  let group = {
    groupName: 'name 1',
    groupAdminId: 1
  }

  let item = {
    itemName: 'first item',
    associationsId: 1
  }
  
  it('Should create a list item when post request is made to /listItem', async () => {

    const token = jwt.sign(user1, process.env.SECRET)

    await server
      .post('/signup')
      .send(user1)

    await server
      .post('/groups')
      .send(group)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

     await server
      .post('/associations/1/1')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    let response = await server
      .post('/listItem')
      .send(item)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');
   
    expect(response.status).toBe(201)

  });


  let updatedItem1 = {
    itemName: 'first update 1',
    associationsId: 1
  }

  it('Should update a list item when put request is made to /listItem/:id', async () => {

    const token = jwt.sign(user1, process.env.SECRET)

    let response = await server
      .put('/listItem/1')
      .send(updatedItem1)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200)

  });

  it('Should find all list items when get request is made to /listItem', async () => {

    const token = jwt.sign(user1, process.env.SECRET)

    let response = await server
      .get('/listItem')
      .send(updatedItem1)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    const item = response.body;

    expect(response.status).toBe(200)
    expect(item).toBe(item)

  });


  it('Should find one list item when get request is made to /listItem/:id', async () => {

    const token = jwt.sign(user1, process.env.SECRET)

    let response = await server
      .get('/listItem/1')
      .send(updatedItem1)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)

  });

  it('Should remove a list item when delete request is made to /listItem/:id', async () => {
    const token = jwt.sign(user1, process.env.SECRET)

    let response = await server
      .delete('/listItem/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)

  });

});
