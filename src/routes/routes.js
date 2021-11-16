'use strict';

const express = require('express');
const dataModules = require('../models/index.js');

const router = express.Router();

const { groups } = require('../models/index.js');

router.param('model', (request, response, next) => {
  const modelName = request.params.model;
  if (dataModules[modelName]){
    request.model = dataModules[modelName];
    next();
  }else{
    next('invalid model');
  }
})

router.post('/api/:model', handleCreate);
router.get('/api/:/model', handleGetAll);
router.get('/api/:model/:id', handleGetOne);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);


async function handleCreate(request, response, next) {

  try {
    let groupRecord = await request.model.create(request.body);

    const output = {
      group: groupRecord,
    };

    response.status(201).json(output);
  } catch (error) {
    next.apply(error.message)
  }

};

async function handleGetAll(request, response, next) {

  try {
    let allGroups = await request.model.findAll({});
    response.status(200).json(allGroups);
  } catch (error) {
    next.apply(error.message);
  }

};

// async function handleGetOne(req, res) {

//   const id = req.params.id;
//   let theRecord = await req.model.findOne({ id });
//   res.status(200).json(theRecord);

// }

module.exports = router;