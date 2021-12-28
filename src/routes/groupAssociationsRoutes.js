'use strict';

const express = require('express');
const { associations, users, groups } = require('../models/index.js');
const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl.js');

const associationsRouter = express.Router();

// post, put, and delete for both admin and users for wishlists
associationsRouter.post('/associations/:id/:userid', handleAssociationCreate);
associationsRouter.delete('/associations/:id/:userid', bearerAuth, permissions('deleteGroupMember'), handleDeleteAssociation);
associationsRouter.get('/associations', handleGetAllAssociations);
associationsRouter.get('/associations/:id', handleGetOneAssociation);
associationsRouter.get('/groupmembers/:groupid', bearerAuth, handleGetGroupAssociations);

async function handleAssociationCreate(request, response, next) {

  try {
    let id = request.params.id;
    let userId = request.params.userid;
    let groupAssociation = await associations.create({groupId: group.id, userId: userId})

    const output = {
      groupAssociation
    };

    response.status(201).json(output);
  } catch (error) {
    response.status(400).send(error);
  }

};

async function handleDeleteAssociation(req, res, next) {

  try{
    const group = req.params.id;
    const user = req.params.userid;
    await associations.destroy({ where: { groupId: group, userId: user } });
    res.status(200).send('deleted!');
  }catch (error){
    res.status(400);
    console.log(error);
  }

};

async function handleGetAllAssociations(req, res, next) {

  try {
    let allAssociations = await associations.findAll({});
    res.status(200).json(allAssociations);
  } catch (error) {
    res.status(400).send(error);
  }

};

async function handleGetOneAssociation(req, res, next) {

  try {
    let id = req.params.id;
    let groupUser = await associations.findAll({where: { userId: id }});
    res.status(200).json(groupUser);
  } catch (error) {
    res.status(400).send(error);
  }

};

async function handleGetGroupAssociations(req, res, next) {

  try {
    let id = req.params.groupid;
    let groupAssociations = await associations.findAll({where: { groupId: id }});
    res.status(200).json(groupAssociations);
  } catch (error) {
    res.status(400).send(error);
  }

};

module.exports = associationsRouter;
