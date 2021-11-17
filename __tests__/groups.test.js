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

describe('Testing requests to /api/groups route', () => {

  let user1 = {
    username: 'username1',
    name: 'supertest1',
    password: 'password1',
    token: null
  }

  let group = {
    groupName: 'name 1',
    groupAdminId: 1
  }
  
  it('Should create a group when post request is made to /api/groups', async () => {

    let response = await server.post('/signup').send(user1);

    response = await server.post('/api/groups').send(group);
    const groupObject = response.body.group;

    expect(response.status).toBe(201)
    expect(groupObject.id).toBe(1)
    expect(groupObject.groupName).toBe('name 1')

  });

  let updatedGroup1 = {
    groupName: 'updated name 1',
    groupAdminId: 1
  }

  it('Should update a group when put request is made to /api/groups/:id', async () => {

    let response = await server.put('/api/groups/1').send(updatedGroup1);

    const groupObject = response.body;

    expect(response.status).toBe(200)
    expect(groupObject.id).toBe(1)
    expect(groupObject.groupName).toBe('updated name 1')

  });

  it('Should find all groups when get request is made to /api/groups', async () => {

    let response = await server.get('/api/groups');

    const groups = response.body;

    console.log(groups, '<-- groups --<<')

    expect(response.status).toBe(200)
    expect(groups[0].id).toBe(1)
    expect(groups[0].groupName).toBe('updated name 1')

  });


  it('Should find one groups when get request is made to /api/groups/:id', async () => {

    let response = await server.get('/api/groups/1');

    const groups = response.body;

    expect(response.status).toBe(200)
    expect(groups.id).toBe(1)
    expect(groups.groupName).toBe('updated name 1')

  });

  it('Should remove a group when delete request is made to /api/groups/:id', async () => {

    let response = await server.delete('/api/groups/1');

    const groups = response.body;

    expect(response.status).toBe(200)

  });

});
