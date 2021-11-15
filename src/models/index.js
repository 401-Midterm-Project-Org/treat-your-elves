'use strict';

const { Sequelize, DataTypes } = require('sequelize')

const userModel = require('./Users.js');
const groupModel = require('./Groups.js');

const DATABASE_URL = 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL)

// TODO: This will go into models/ index.js These models will not work with another database technology.
// list.hasMany(listItem, { foreignKey: 'listId', sourceKey: 'id' });
// listItem.belongsTo(list, { foreignKey: 'listId', targetKey: 'id' });

module.exports = {
  db:sequelize,
  users: userModel(sequelize, DataTypes),
  groups: groupModel(sequelize, DataTypes)
};
