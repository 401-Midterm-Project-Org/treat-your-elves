'use strict';

const santaPairModel = (sequelize, DataTypes) => {
  const model = sequelize.define('SantaPairs', {

    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    santaAssociationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    recipientAssociationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
  })

  return model;
}

module.exports = santaPairModel;