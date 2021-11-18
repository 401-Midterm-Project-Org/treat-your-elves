'use strict';

const express = require('express');

const authRouter = express.Router();

const { users } = require('../models/index.js');

const basicAuth = require('../middleware/basic.js');

authRouter.post('/signin', basicAuth, async (request, response, next) => {

  try {
console.log(request, '<-- request --<<')
    const user = {
      user: request.user,
      token: request.user.token,
    };

    response.status(200);
    response.send(user);
  } catch (e) {
    response.status(403);
    response.send('Invalid login', e);
  }
})

module.exports = authRouter;