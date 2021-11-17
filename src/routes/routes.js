'use strict';

const express = require('express');
const dataModules = require('../models/index.js');

const router = express.Router();

// const acceptAdmin = require('../middleware/acl.js');

const { groups } = require('../models/index.js');

router.param('model', (request, response, next) => {
  const modelName = request.params.model;
  console.log('modelname string is ' + modelName);
  if (dataModules[modelName]){
    request.model = dataModules[modelName];
    next();
  }else{
    next('invalid model');
  }
})

// post, put, and delete for admin management of a group itself
// router.post('/api/group', handleCreate);
// router.put('/api/group/:id', acceptAdmin, handleUpdate);
// router.delete('/api/group/:id', acceptAdmin, handleDelete);
// router.get('/api/group', handleGetAll);
// router.get('/api/group/:id', handleGetOne);

// post, put, and delete for admin management of users in a group
// router.post('/api/groupusers', acceptAdmin, handleCreate);
// router.put('/api/groupusers/:id', acceptAdmin, handleUpdate);
// router.delete('/api/groupusers/:id', acceptAdmin, handleDelete);
// router.get('/api/groupusers', handleGetAll);
// router.get('/api/groupusers/:id', handleGetOne);

// post, put, and delete for both admin and users for wishlists
router.post('/api/wishlist', handleCreate);
router.put('/api/wishlist/:id', handleUpdate);
router.delete('/api/wishlist/:id', handleDelete);
router.get('/api/wishlist', handleGetAll);
router.get('/api/wishlist/:id', handleGetOne);

/*
router.post('/api/:model', handleCreate);
router.get('/api/:model', handleGetAll);
router.get('/api/:model/:id', handleGetOne);
router.put('/api/:model/:id', handleUpdate);
router.delete('/api/:model/:id', handleDelete);
*/

/* 
MVP TO DO:
--------- 11/16
- [x] Sign up
- [x] Sign in
--------- 11/17
- [O]  Apply ACL middleware to routes
- [x]  Create a group
- [x]  On group creation Groups-Association table is filled
- []  Add users to group
- []  Remove users from group
- []  Users have wishlists created on addition to a group
- []  Users can perform CRUD on their wishlists
- []  Randomly assign users to each other's wishlists
- []  Make other user's wishlist visible (scope: all members of group)
- []  All users can mark a wishlist item as fulfilled (secretly)
*/

async function handleCreate(request, response, next) {

  // use model while restricting routes?
  try {
    let groupRecord = await request.model.create(request.body);
    // create groupAssociation in similar fashion?
    const output = {
      group: groupRecord,
    };

    response.status(201).json(output);
  } catch (error) {
    response.status(400);
    console.log(error);
  }

};

async function handleGetAll(req, res, next) {

  try {
    let allGroups = await req.model.findAll({});
    res.status(200).json(allGroups);
  } catch (error) {
    res.status(400);
    console.log(error);
  }

};

async function handleGetOne(req, res, next) {

  try{
    const id = req.params.id;
    let theRecord = await req.model.findOne({where: { id }});
    res.status(200).json(theRecord);
  }catch (error){
    res.status(400);
    console.log(error);
  }

}

async function handleGetOne(req, res, next) {

  try{
    const id = req.params.id;
    let theRecord = await req.model.findOne({where: { id }});
    res.status(200).json(theRecord);
  }catch (error){
    res.status(400);
    console.log(error);
  }

}

async function handleUpdate(req, res, next) {

  try{
    const id = req.params.id;
    const newItem = req.body;
    let theRecord = await req.model.findOne({where: { id }}).then(record => record.update(newItem));
    res.status(200).json(theRecord);
  }catch (error){
    res.status(400);
    console.log(error);
  }

}

async function handleDelete(req, res, next) {

  try{
    const id = req.params.id;
    await req.model.destroy({where: { id }});
    res.status(200).send('deleted!');
  }catch (error){
    res.status(400);
    console.log(error);
  }

}


module.exports = router;