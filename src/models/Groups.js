'use strict';

const groupModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Groups', {

    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    groupAdminId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  return model;
}

module.exports = groupModel;