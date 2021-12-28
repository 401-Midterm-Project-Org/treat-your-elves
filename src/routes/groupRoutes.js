'use strict';

const express = require('express');

const groupRouter = express.Router();

const { groups, associations, santaPairs } = require('../models/index.js');

const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl.js');

groupRouter.post('/groups', bearerAuth, handleGroupCreate);
groupRouter.put('/groups/:id', bearerAuth, permissions('updateGroup'), handleGroupUpdate);
groupRouter.delete('/groups/:id', bearerAuth, permissions('deleteGroup'), handleDeleteGroup);
groupRouter.get('/groups', bearerAuth, handleGetAllGroups);
groupRouter.get('/groups/:id', bearerAuth, handleGetOneGroup);

async function handleGroupCreate(request, response, next) {

  try {
    let groupRecord = await groups.create(request.body);
    let groupAssociation = await associations.create({groupId: groupRecord.id, userId: groupRecord.groupAdminId, role: 'admin'})

    const output = {
      group: groupRecord,
      groupAssociation
    };

    response.status(201).json(output);
  } catch (error) {
    response.status(400).send(error);
  }

};

async function handleGroupUpdate(req, res, next) {

  try{
    const id = req.params.id;
    const newItem = req.body;
    let theRecord = await groups.findOne({where: { id }}).then(record => record.update(newItem));
    res.status(200).json(theRecord);

  }catch (error){
    res.status(400);
    console.log(error);
  }

};

async function handleGetAllGroups(req, res, next) {

  try {
    let allGroups = await groups.findAll({});
    res.status(200).json(allGroups);
  } catch (error) {
    res.status(400);
    console.log(error);
  }

};

async function handleGetOneGroup(req, res, next) {

  try{
    const id = req.params.id;
    let theRecord = await groups.findOne({where: { id }});
    res.status(200).json(theRecord);
  }catch (error){
    res.status(400);
    console.log(error);
  }

};

async function handleDeleteGroup(req, res, next) {

  try{
    const id = req.params.id;
    await groups.destroy({ where: { id } });
    await associations.destroy({ where: { groupId:id } });
    await santaPairs.destroy({ where: { groupId:id } });
    res.status(200).send('deleted!');
  }catch (error){
    res.status(400);
    console.log(error);
  }

};

module.exports = groupRouter;