'use strict';

const { db } = require('../src/models');
const supertest = require('supertest');
const app = require('../src/server.js');
const server = supertest(app.server);

process.env.SECRET = 'secretstuffhere';

const jwt = require('jsonwebtoken');

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  user: { username: 'user', password: 'password', role: 'user' },
};

beforeAll( async () => {
  await db.sync()
});

afterAll( async () => {
  await db.drop()
});

describe('Testing requests to /groups route', () => {

  let user1 = {
    username: 'username1',
    name: 'supertest1',
    password: 'password1',
  }

  let group = {
    groupName: 'name 1',
    groupAdminId: 1
  }
  
  it('Should create a group when post request is made to /groups', async () => {

    let response = await server.post('/signup').send(user1);

    const token = jwt.sign(user1, process.env.SECRET);

    console.log(token, '<-- TOKEN --<<')

    response = await server
      .post('/groups')
      .send(group)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    const groupObject = response.body.group;

    expect(response.status).toBe(201)
    expect(groupObject.id).toBe(1)
    expect(groupObject.groupName).toBe('name 1')

  });

  let group2 = {
    groupName: 'name 2',
    groupAdminId: 1
  }

  it('Should create multiple group when more post requests are made to /groups', async () => {
    let response = await server.post('/signup').send(user1);

    const token = jwt.sign(user1, process.env.SECRET);

    response = await server
      .post('/groups')
      .send(group2)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    const groupObject = response.body.group;

    expect(response.status).toBe(201)
    expect(groupObject.id).toBe(2)
    expect(groupObject.groupName).toBe('name 2')

  });

  let updatedGroup1 = {
    groupName: 'updated name 1',
    groupAdminId: 1
  }

  it('Should update a group when put request is made to /groups/:id', async () => {

    let response = await server.post('/signup').send(user1);

    const token = jwt.sign(user1, process.env.SECRET);

    response = await server
      .put('/groups/1')
      .send(updatedGroup1)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    const groupObject = response.body;

    expect(response.status).toBe(200)
    expect(groupObject.id).toBe(1)
    expect(groupObject.groupName).toBe('updated name 1')

  });

  // it('Should find all groups when get request is made to /groups', async () => {

  //   let response = await server.get('/groups');

  //   const groups = response.body;

  //   console.log(groups, '<-- SHOULD BE ALL GROUPS --<<')

  //   expect(response.status).toBe(200)
  //   expect(groups[0].id).toBe(1)
  //   expect(groups[0].groupName).toBe('updated name 1')

  // });


  // it('Should find one groups when get request is made to /groups/:id', async () => {

  //   let response = await server.get('/groups/1');

  //   const groups = response.body;

  //   expect(response.status).toBe(200)
  //   expect(groups.id).toBe(1)
  //   expect(groups.groupName).toBe('updated name 1')

  // });

  // it('Should remove a group when delete request is made to /groups/:id', async () => {

  //   let response = await server.delete('/groups/1');

  //   expect(response.status).toBe(200)

  // });

});
