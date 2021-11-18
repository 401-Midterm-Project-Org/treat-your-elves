'use strict';

const express = require('express');

const listRouter = express.Router();

const { associations, listItem } = require('../models/index.js');


listRouter.post('/listItem', handleListItemCreate);
listRouter.put('/listItem/:id', handleListItemUpdate);
// listRouter.delete('/listItem/:id', handleDeleteGroup);
// listRouter.get('/listItem', handleGetAllGroups);
// listRouter.get('/listItem/:id', handleGetOneGroup);

async function handleListItemCreate(request, response, next) {

  try {
    let newListItem = await listItem.create({associationsId: request.body.associationsId, itemName: request.body.itemName});
    response.status(201).json(newListItem);
  } catch (error) {
    response.status(400).send(error);
  }

};

async function handleListItemUpdate(req, res, next) {

  try{
    const id = req.params.id;
    const newItem = req.body;
    let updatedItem = await listItem.findOne({where: { id }}).then(record => record.update(newItem));
    res.status(200).json(updatedItem);

  }catch (error){
    res.status(400);
    console.log(error);
  }

};

// async function handleGetAllGroups(req, res, next) {

//   try {
//     let allGroups = await groups.findAll({});
//     res.status(200).json(allGroups);
//   } catch (error) {
//     res.status(400);
//     console.log(error);
//   }

// };

// async function handleGetOneGroup(req, res, next) {

//   try{
//     const id = req.params.id;
//     let theRecord = await groups.findOne({where: { id }});
//     res.status(200).json(theRecord);
//   }catch (error){
//     res.status(400);
//     console.log(error);
//   }

// };

// async function handleDeleteGroup(req, res, next) {

//   try{
//     const id = req.params.id;
//     await groups.destroy({ where: { id } });
//     await associations.destroy({ where: { groupId:id } });
//     res.status(200).send('deleted!');
//   }catch (error){
//     res.status(400);
//     console.log(error);
//   }

// };

module.exports = listRouter;