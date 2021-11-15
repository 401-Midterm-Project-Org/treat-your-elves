'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const { Schema } = mongoose;

const userSchema = new Schema({

  username: String,
  password: String,
  name: String,
  email: String,

})

const User = mongoose.model('User', userSchema);

module.exports = User;