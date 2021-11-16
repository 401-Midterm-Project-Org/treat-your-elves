'use strict';

const { Sequelize, DataTypes } = require('sequelize')

const userModel = require('./Users.js');
const groupModel = require('./Groups.js');
const wishListModel = require('./Wishlist.js');
const listItemModel = require('./List-Item.js');

const DATABASE_URL = 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

// instantiate our DB with our models
const groups = groupModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);
const wishList = wishListModel(sequelize, DataTypes);
const listItem = listItemModel(sequelize, DataTypes);


// DONE: connecting group to user admin
users.hasMany(groups, { foreignKey: 'groupAdminId', sourceKey: 'id' });
groups.belongsTo(users, { foreignKey: 'groupAdminId', targetKey: 'id' });

// TODO: connecting wishlist to user
users.hasMany(wishList, { foreignKey: 'wishListId', sourceKey: 'id' });
wishList.belongsTo(users, { foreignKey: 'wishListId', targetKey: 'id' });

// TODO: connecting list item to wishlist
wishList.hasMany(listItem, { foreignKey: 'listId', sourceKey: 'id' });
listItem.belongsTo(wishList, { foreignKey: 'listId', targetKey: 'id' });

module.exports = {
  db:sequelize,
  users,
  groups
};
