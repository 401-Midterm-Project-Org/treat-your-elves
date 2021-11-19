'use strict';

const middleware = require('../src/middleware/basic.js');
const { db, users } = require('../src/models/index.js');
const supertest = require("supertest");
const { server } = require("../src/server.js");
const mockRequest = supertest(server);

let user = {
  admin: { username: 'test', password: 'test', name: 'test' },
};

beforeAll(async () => {
  await db.sync();
  await users.create(user.admin);
});

afterAll(async () => {
  await db.drop();
})

describe('Basic Auth Middleware', () => {

  it('Fails to login user with the incorrect credentials', () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res)
    }
    const next = jest.fn();

    req.headers = {
      authorization: 'Basic YWRtaW46Zm9v',
    };

    return middleware(req, res, next)
      .then(() => {
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
      });

  });

  it("Successfully logs in user with basicAuth", async () => {
    const response = await mockRequest
      .post("/signin")
      .auth(user.admin.username, user.admin.password);

    const userObject = response.body;
    expect(response.status).toBe(200);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual('test');
  });

});
