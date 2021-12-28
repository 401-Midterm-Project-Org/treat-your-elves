'use strict';

const express = require('express');
const { users } = require('../models/index.js');

const userRouter = express.Router();

// post, put, and delete for both admin and users for wishlists
userRouter.get('/name/:userid', handleGetName);

async function handleGetName(request, response, next){
  try{
    let id = parseInt(request.params.userid);
    let user = await users.findOne({ where: { id } })
    response.status(200).send(user.name);
  }catch(e){
    response.status(400).send(e);
  }
}

module.exports = userRouter;
