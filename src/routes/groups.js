'use strict';

const express = require('express');

const router = express.Router();

const { groups } = require('../models/index.js');

router.post('/api/groups', async (request, response, next) => {

  try {
    let groupRecord = await groups.create(request.body);

    const output = {
      group: groupRecord,
    };

    response.status(201).json(output);
  } catch (error) {
    next.apply(error.message)
  }
});

module.exports = router;