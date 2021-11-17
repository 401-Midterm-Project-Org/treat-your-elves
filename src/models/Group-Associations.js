'use strict';

const { VIRTUAL } = require("sequelize");

const userGroupAssociationsModel = (sequelize, DataTypes) => {
  const model = sequelize.define('GroupAssociations', {

    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

    // userRole: {
    //   allowNull: false,
    //   type: DataTypes.ENUM('user', 'admin'),
    //   defaultValue: 'user'
    // },

    // secretSanta: {
    //   allowNull: true,
    //   type: DataTypes.INTEGER,
    //   defaultValue: null
    // }

    // capabilities: {
    //   allowNull: false,
    //   type:  DataTypes.VIRTUAL,
    //   get() {
    //     const acl = {
    //       user:['read', 'create', 'update', 'delete'],
    //       admin:['read', 'create', 'update', 'delete']
    //     };
    //     return acl[this.userRole];
    //   }
    // }
    
  })

  return model;
}

module.exports = userGroupAssociationsModel;