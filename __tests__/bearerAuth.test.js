'use strict';

const middleware = require('../src/middleware/bearer.js');
const { db, users } = require('../src/models/index.js');
const jwt = require('jsonwebtoken')

process.env.SECRET = "secretstring";

let user = {
  admin: { username: 'admin', password: 'password', name: 'test' },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await db.sync();
  await users.create(user.admin);
});

afterAll(async () => {
  await db.drop();
});

describe('Auth Middleware', () => {

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', () => {

      req.headers = {
        authorization: 'thisisabadtoken',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    });

    it('logs in a user with a proper token', () => {

      const token = jwt.sign(user.admin, process.env.SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalled(1);
        });

    });

  });

});
