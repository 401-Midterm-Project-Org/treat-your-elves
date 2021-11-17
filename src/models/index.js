'use strict';

const { Sequelize, DataTypes } = require('sequelize')

const userModel = require('./Users.js');
const groupModel = require('./Groups.js');
const userGroupAssociationsModel = require('./Group-Associations.js');
// const listItemModel = require('./List-Item.js');

const DATABASE_URL = 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

// instantiate our DB with our models
const groups = groupModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);
const associations = userGroupAssociationsModel(sequelize, DataTypes);
// const listItem = listItemModel(sequelize, DataTypes);

// connecting group to user admin
users.hasMany(groups, { foreignKey: 'groupAdminId', sourceKey: 'id' });
groups.belongsTo(users, { foreignKey: 'groupAdminId', targetKey: 'id' });

// connecting associations table with users
users.hasMany(associations, { foreignKey: 'userId', sourceKey: 'id' });
associations.belongsTo(users, { foreignKey: 'userId', targetKey: 'id' })

// connecting associations table with groups
groups.hasMany(associations, { foreignKey: 'groupId', sourceKey: 'id' });
associations.belongsTo(groups, { foreignKey: 'groupId', targetKey: 'id' })

// connecting list items to associations table
// associations.hasMany(listItem, { foreignKey: 'associationsID', sourceKey: 'id' });
// listItem.belongsTo(associations, { foreignKey: 'associationsID', targetKey: 'id' });

module.exports = {
  db:sequelize,
  users,
  groups,
  associations
  // listItem
};
