'use strict';

const express = require('express');

const authRouter = express.Router();

const { users } = require('../models/index.js');
// const basicAuth = require('../middleware/basic.js');

authRouter.post('/signin', async (request, response, next) => {
  const email = request.body.email.toLowerCase();

  try {
    let user = await users.findOne({ where: { email } });

    // instead of throwing error, create a new user
    if (!user) {
      // create new user
      user = await users.create(request.body);
    }

    console.log(user);
    // console.log(request.body);

    response.status(200);
    response.send(user);
  } catch (e) {
    response.status(403);
    response.send('Invalid login', e);
  }
})

module.exports = authRouter;