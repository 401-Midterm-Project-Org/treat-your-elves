'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstuffhere';

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
    
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET)
      }
    },
  });

  model.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const validUser = await bcrypt.compare(password, user.password);
    if (validUser) { return user;}
    throw new Error('Invalid User');
  };

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