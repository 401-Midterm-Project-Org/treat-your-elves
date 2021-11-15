'use strict';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {

    username: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    groups:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }

  })

  return model;
}

module.exports = userModel;