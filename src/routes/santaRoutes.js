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
    //grabs group id on path parameter
    const id = request.params.id;
    
    //gets group members from the associations table
    const groupMembers = await associations.findAll({where: {groupId: id}});
  
    //maps through the group member associations and returns their unique ids
    let groupMemberIds = groupMembers.map(member => member.id);
    console.log('group member ids: ', groupMemberIds)
  
    //uses shuffle algorithm to reorder user ids
    shuffle(groupMemberIds);
    console.log('group member ids after shuffle: ', groupMemberIds)

    // loops through ids and creates pairs - pairing id at position x with id at position x+1 except for last index where id at last id is paired with first id
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
  // creates variables m, t and i
  let m = array.length, t, i;

  //while m is not 0
  while (m) {

    //set i to a random number between 0 and m, THEN decrements m
    i = Math.floor(Math.random() * m--);

    // set t to the last unshuffled array item.  saves this value to t
    t = array[m];

    // puts the item in position i in the last spot of the array, and puts the saved t value in i's position
    array[m] = array[i];
    array[i] = t;

  }

  return array;
}

module.exports = santaRouter;