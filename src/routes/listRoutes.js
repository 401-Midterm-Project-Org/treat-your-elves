'use strict';

const express = require('express');

const listRouter = express.Router();

const { listItem } = require('../models/index.js');


listRouter.post('/listItem', handleListItemCreate);
listRouter.put('/listItem/:id', handleListItemUpdate);
listRouter.delete('/listItem/:id', handleDeleteListItem);
listRouter.get('/listItem', handleGetAllListItems);
listRouter.get('/listItem/:id', handleGetOneItem);

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

async function handleGetAllListItems(req, res, next) {

  try {
    let allItems = await listItem.findAll({});
    res.status(200).json(allItems);
  } catch (error) {
    res.status(400).status(error);
  }

};

async function handleGetOneItem(req, res, next) {

  try{
    const id = req.params.id;
    let theItem = await listItem.findOne({where: { id }});
    res.status(200).json(theItem);
  }catch (error){
    res.status(400).status(error);
  }

};

async function handleDeleteListItem(req, res, next) {

  try{
    const id = req.params.id;
    await listItem.destroy({ where: { id } });
    res.status(200).send('deleted!');
  }catch (error){
    res.status(400).send(error);
  }

};

module.exports = listRouter;