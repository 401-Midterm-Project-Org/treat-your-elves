'use strict';

const userGroupAssociationsModel = (sequelize, DataTypes) => {
  const model = sequelize.define('GroupAssociations', {

    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userRole: {
      allowNull: false,
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },

    wishListId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    
    //TODO: associate secret santa to user, may start as null

  })

  return model;
}

module.exports = userGroupAssociationsModel;