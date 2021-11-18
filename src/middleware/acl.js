'use strict';

const { associations } = require("../models");

module.exports = (capability) => {

  return async (req, res, next) => {

    try {
      let groupId = req.params.id;
      let userId = req.user.id;
      const association = await associations.findOne({ where: { groupId, userId }})

      if (association.capabilities.includes(capability)) {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next('ACLI: Invalid Login');
    }

  };

};