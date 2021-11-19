'use strict';

const middleware = require('../src/middleware/basic.js');
const { db, users } = require('../src/models/index.js');

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
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();

  it('Fails to login user with the incorrect credentials', () => {
    
    req.headers = {
      authorization: 'Basic YWRtaW46Zm9v',
    };

    return middleware(req, res, next)
      .then(() => {
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
      });

  });

  it('Logs in an admin user with the right credentials', () => {

    req.headers = {
      authorization: 'Basic dGVzdDp0ZXN0',
    };

    return middleware(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith();
      });

  });

});
