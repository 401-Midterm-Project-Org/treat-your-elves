'use strict';

const wishListModel = (sequelize, DataTypes) => {

  const model = sequelize.define('WishList', {

    listCreator: { 
      type: DataTypes.STRING, 
      allowNull: false
    },

    secretSanta: {
      type: DataTypes.STRING, 
      allowNull: true
    }

  })
  return model;
}

module.exports = wishListModel;





