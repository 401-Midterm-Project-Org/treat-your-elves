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

  let santaPair = {
    groupId: 1,
    santaAssociationId: 1,
    recipientAssociationId: 1
  }
  
  it('Should create a santa pair when post request is made to /santa/:id', async () => {

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

    await server
      .post('/listItem')
      .send(item)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    let response = await server
      .post('/santa/1')
      .send(santaPair)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');
   
    expect(response.status).toBe(200)

  });

  it('Should find all santa pairs when get request is made to /santa', async () => {

    const token = jwt.sign(user1, process.env.SECRET)

    let response = await server
      .get('/santa')
      .send(santaPair)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200)

  });


  it('Should find one santa pair when get request is made to /santa/:1', async () => {

    const token = jwt.sign(user1, process.env.SECRET)

    let response = await server
      .get('/santa/1')
      .send(santaPair)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200)

  });


});
