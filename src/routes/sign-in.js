'use strict';

const express = require('express');

const authRouter = express.Router();

const { users } = require('../models/index.js');

authRouter.post('/signin', async (request, response, next) => {
  const email = request.body.email.toLowerCase();

  try {
    let user = await users.findOne({ where: { email } });

    if (!user) {
      user = await users.create(request.body);
    }

    console.log(user);

    response.status(200);
    response.send(user);
  } catch (e) {
    response.status(403);
    response.send('Invalid login', e);
  }
})

module.exports = authRouter;