'use strict';

const express = require('express');
const { associations, users, groups } = require('../models/index.js');
const accessControl = require('../middleware/acl');

const associationsRouter = express.Router();

// post, put, and delete for both admin and users for wishlists
associationsRouter.post('/associations/:groupid/:userid',accessControl('delete'), handleAssociationCreate);
associationsRouter.delete('/associations/:id', accessControl('delete'), handleDeleteAssociation);
associationsRouter.get('/associations', handleGetAllAssociations);
associationsRouter.get('/associations/:id', handleGetOneAssociation);
associationsRouter.get('/groupmembers/:groupid', handleGetGroupAssociations);

async function handleAssociationCreate(request, response, next) {

  // use model while restricting routes?
  try {
    let id = request.params.groupid;
    let userId = request.params.userid;
    let group = await groups.findOne({where: { id }});
    let user = await users.findOne({where: { id : userId }})
    let groupAssociation = await associations.create({groupId: group.id, userId: user.id})

    const output = {
      groupAssociation
    };

    response.status(201).json(output);
  } catch (error) {
    response.status(400).send(error);
  }

};


// TO DO: Test with user

async function handleDeleteAssociation(req, res, next) {

  // maybe revisit to add logic (perhaps middleware), so admins cannot be deleted this way.

  try{
    const id = req.params.id;
    await associations.destroy({ where: { id } });
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
    let groupUser = await associations.findAll({where: { id }});
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
