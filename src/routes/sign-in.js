'use strict';

const express = require('express');

const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');

authRouter.post('/signin', basicAuth, async (request, response, next) => {

  try {

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