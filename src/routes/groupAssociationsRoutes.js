'use strict';

const express = require('express');
const dataModules = require('../models/index.js');

const router = express.Router();

// post, put, and delete for both admin and users for wishlists
router.post('/api/groupusers', acceptAdmin, handleCreate);
router.put('/api/groupusers/:id', acceptAdmin, handleUpdate);
router.delete('/api/groupusers/:id', acceptAdmin, handleDelete);
router.get('/api/groupusers', handleGetAll);
router.get('/api/groupusers/:id', handleGetOne);