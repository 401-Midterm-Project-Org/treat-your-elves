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
      type: DataTypes.STRING,
      allowNull: false,
    }

  })

  return model;
}

module.exports = userGroupAssociationsModel;