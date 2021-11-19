'use strict';

const { db } = require('../src/models');
const supertest = require('supertest');
const app = require('../src/server.js');
const server = supertest(app.server);

process.env.SECRET = 'secretstuffhere';

const jwt = require('jsonwebtoken');

beforeAll( async () => {
  await db.sync()
});

afterAll( async () => {
  await db.drop()
});

describe('Testing requests to /associations route', () => {

  let user1 = {
    username: 'username2',
    name: 'supertest2',
    password: 'password2',
  }

  let groupAssociation = {
    groupId: 1,
    userId: 1,
    role: 'admin',
  }
  
  it('Should create a group when a post request is made to /associations', async () => {

    let response = await server.post('/signup').send(user1);

    const token = jwt.sign(user1, process.env.SECRET);

    await server
      .post('/associations/1/1')
      .send(groupAssociation)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201)

  });

  let groupAssociation2 = {
    groupId: 2,
    userId: 1,
    role: 'admin',
  }

  it('Should create multiple group when more post requests are made to /associations', async () => {

    let response = await server.post('/signup').send(user1);

    const token = jwt.sign(user1, process.env.SECRET);

    await server
      .post('/associations/1/2')
      .send(groupAssociation2)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201)

  });

  // let updatedGroup1 = {
  //   groupName: 'updated name 1',
  //   groupAdminId: 1
  // }

  // it('Should update a group when a put request is made to /associations/:id', async () => {

  //   let response = await server.post('/signup').send(user1);

  //   const token = jwt.sign(user1, process.env.SECRET);

  //   response = await server
  //     .put('/associations/1')
  //     .send(updatedGroup1)
  //     .set('Authorization', `Bearer ${token}`)
  //     .set('Accept', 'application/json');

  //   const groupObject = response.body;

  //   expect(response.status).toBe(200)
  //   expect(groupObject.id).toBe(1)
  //   expect(groupObject.groupName).toBe('updated name 1')

  // });

  // it('Should find all groups when a get request is made to /associations', async () => {

  //   let response = await server.post('/signup').send(user1);

  //   const token = jwt.sign(user1, process.env.SECRET);

  //   response = await server
  //     .get('/associations')
  //     .set('Authorization', `Bearer ${token}`)

  //   const groups = response.body;

  //   expect(response.status).toBe(200)
  //   expect(groups[0].id).toBe(1)
  //   expect(groups[0].groupName).toBe('updated name 1')

  // });


  // it('Should find one group when a get request is made to /associations/:id', async () => {

  //   let response = await server.post('/signup').send(user1);

  //   const token = jwt.sign(user1, process.env.SECRET);

  //   response = await server
  //     .get('/associations/1')
  //     .set('Authorization', `Bearer ${token}`)

  //   const groups = response.body;

  //   expect(response.status).toBe(200)
  //   expect(groups.id).toBe(1)
  //   expect(groups.groupName).toBe('updated name 1')

  // });

  // it('Should remove a group when a delete request is made to /associations/:id', async () => {

  //   let response = await server.post('/signup').send(user1);

  //   const token = jwt.sign(user1, process.env.SECRET);

  //   response = await server
  //     .delete('/associations/1/1')
  //     .set('Authorization', `Bearer ${token}`)

  //   expect(response.status).toBe(200)

  // });

});
