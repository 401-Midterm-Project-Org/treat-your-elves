'use strict';

// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstuffhere';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {

    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });

  // model.beforeCreate(async (user) => {
  //   user.password = await bcrypt.hash(user.password, 10);
  // });

  // model.authenticateBasic = async function (username, password) {
    /*
  model.authenticateBasic = async function (email, firstName, lastName) {
    // we still need to see if there's a user
    let user = await this.findOne({ where: { email:email.toLowerCase() } });

    // const validUser = await bcrypt.compare(password, user.password);
    // if (validUser) { return user;}

    // instead of throwing error, create a new user
    if (!user) {
      // create new user
      user = await this.create({email, firstName, lastName});
    }

    return user;
    // throw new Error('Invalid User');
  };
  */

  model.authenticateToken = async function (token) {
    const parsedToken = jwt.verify(token, SECRET);
    const user = await this.findOne({ where: { username: parsedToken.username } });
    if(user) {
      return user;
    } else {
      return new Error('User not found.');
    }
  };

  return model;
}

module.exports = userModel;
