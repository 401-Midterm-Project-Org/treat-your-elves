'use strict';

const express = require('express');

const authRouter = express.Router();

const { users } = require('../models/index.js');

authRouter.post('/signup', async (request, response, next) => {

  try {
    let userRecord = await users.create(request.body);

    const output = {
      user: userRecord,
    };

    response.status(201).json(output);
  } catch (error) {
    next.apply(error.message)
  }
});

module.exports = authRouter;