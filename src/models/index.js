'use strict';

const { Sequelize, DataTypes } = require('sequelize')

const userModel = require('./Users.js');
const groupModel = require('./Groups.js');

const DATABASE_URL = 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

module.exports = {
  db:sequelize,
  users: userModel(sequelize, DataTypes),
  groups: groupModel(sequelize, DataTypes)
};
