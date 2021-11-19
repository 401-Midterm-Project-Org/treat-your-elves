'use strict';

const express = require('express');
const { associations, santaPairs } = require('../models/index.js');

const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl.js');

const santaRouter = express.Router();

santaRouter.post('/santa/:id', bearerAuth, permissions('generateGroupPairs'), handlePairSantas);
santaRouter.get('/santa', bearerAuth, getAllPairs);
santaRouter.get('/santa/:groupid', bearerAuth, getGroupPairs);

async function handlePairSantas(request, response, next){

  try{
    const id = request.params.id;
    
    const groupMembers = await associations.findAll({where: {groupId: id}});
    let groupMemberIds = groupMembers.map(member => member.id);
    console.log('group member ids: ', groupMemberIds)
    shuffle(groupMemberIds);
    console.log('group member ids after shuffle: ', groupMemberIds)

    for (let i=0; i<groupMemberIds.length-1; i++){
      await santaPairs.create({groupId: id, santaAssociationId: groupMemberIds[i], recipientAssociationId: groupMemberIds[i+1]});
    }
    await santaPairs.create({groupId: id, santaAssociationId: groupMemberIds[groupMemberIds.length-1], recipientAssociationId: groupMemberIds[0]});

    response.status(200).send('pairs created!');

  }catch(error){
    response.status(400).send(error);
  }

}

async function getAllPairs(request, response, next){
  try{
    const pairs = await santaPairs.findAll({});
    response.status(200).json(pairs);
  }catch(error){
    response.status(400).send('no pairs', error);
  }
}

async function getGroupPairs(request, response, next){
  try{
    const id = request.params.groupid;
    const pairs = await santaPairs.findAll({where: { groupId: id }});
    response.status(200).json(pairs);
  }catch(error){
    response.status(400).send('no pairs', error);
  }
}

function shuffle(array) {
  let m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

module.exports = santaRouter;