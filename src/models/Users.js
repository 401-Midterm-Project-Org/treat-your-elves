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
    }

  })

  return model;
}

module.exports = userModel;