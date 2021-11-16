'use strict';

const listItemModel = (sequelize, DataTypes) => {

  const model = sequelize.define('ListItem', {

    name: { 
      type: DataTypes.STRING, 
      allowNull: false
    },

    fullfilled: {
      type: DataTypes.BOOLEAN, 
      allowNull: true
    }

  })
  return model;
}

module.exports = listItemModel;
