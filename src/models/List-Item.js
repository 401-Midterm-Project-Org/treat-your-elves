'use strict';

const wishListItemModel = (sequelize, DataTypes) => {

  const model = sequelize.define('ListItem', {

    itemName: { 
      type: DataTypes.STRING, 
      allowNull: false
    },

    associationsId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  })
  return model;
}

module.exports = wishListItemModel;
