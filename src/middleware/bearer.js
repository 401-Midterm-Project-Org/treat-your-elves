'use strict';

const { users } = require('../models/index.js');

module.exports = async (request, response, next) => {

  try {
    if(!request.headers.authorization) {
      throw new Error('There is no authorization header');
    }
    const token = request.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    request.user = validUser;
    request.token = validUser.token;
    next()
  } catch (e) {
    response.status(403).send('BEARER: token not authenticated.', e);
  }
}
