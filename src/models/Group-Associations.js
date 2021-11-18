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

    role: {
      allowNull: false,
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },

    capabilities: {
      type:  DataTypes.VIRTUAL,
      get() {
        const acl = {
          user:['read', 'createWish', 'updateWish', 'deleteWish'],
          admin:['read', 'createWish', 'updateWish', 'deleteWish', 'createGroupMember', 'deleteGroupMember', 'updateGroup', 'deleteGroup', 'generateGroupPairs']
        };
        return acl[this.role];
      }
    }
    
  })

  return model;
}

module.exports = userGroupAssociationsModel;