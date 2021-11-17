'use strict';

/* 
- [] Middleware to find user creating the group
- [] Create "admin" groupAssociation with group & creator upon group creation
*/

const express = require('express');
const dataModules = require('../models/index.js');

const groupRouter = express.Router();

const { groups, associations } = require('../models/index.js');


// post, put, and delete for admin management of a group itself
groupRouter.post('/groups', handleCreate);
groupRouter.put('/group/:id', handleUpdate);
// groupRouter.delete('/group/:id', handleDelete);
// groupRouter.get('/group', handleGetAll);
// groupRouter.get('/group/:id', handleGetOne);

async function handleCreate(request, response, next) {

  // use model while restricting routes?
  try {
    let groupRecord = await groups.create(request.body);
    let groupAssociation = await associations.create({groupId: groupRecord.id, userId: groupRecord.groupAdminId})

    const output = {
      group: groupRecord,
      groupAssociation
    };

    response.status(201).json(output);
  } catch (error) {
    response.status(400).send(error);
  }

};

module.exports = groupRouter;