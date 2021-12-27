'use strict';

const { Sequelize, DataTypes } = require('sequelize')

const userModel = require('./Users.js');
const groupModel = require('./Groups.js');
const userGroupAssociationsModel = require('./Group-Associations.js');
const listItemModel = require('./List-Item.js');
const santaPairModel = require('./Santa')

const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite:memory:' 
  : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
} : {}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const groups = groupModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);
const associations = userGroupAssociationsModel(sequelize, DataTypes);
const listItem = listItemModel(sequelize, DataTypes);
const santaPairs = santaPairModel(sequelize, DataTypes);

// users.hasMany(groups, { foreignKey: 'groupAdminId', sourceKey: 'id' });
// groups.belongsTo(users, { foreignKey: 'groupAdminId', targetKey: 'id' });

// users.hasMany(associations, { foreignKey: 'userId', sourceKey: 'id' });
// associations.belongsTo(users, { foreignKey: 'userId', targetKey: 'id' })

groups.hasMany(associations, { foreignKey: 'groupId', sourceKey: 'id' });
associations.belongsTo(groups, { foreignKey: 'groupId', targetKey: 'id' })

associations.hasMany(listItem, { foreignKey: 'associationsId', sourceKey: 'id' });
listItem.belongsTo(associations, { foreignKey: 'associationsId', targetKey: 'id' });

module.exports = {
  db:sequelize,
  users,
  groups,
  associations,
  listItem,
  santaPairs
};
