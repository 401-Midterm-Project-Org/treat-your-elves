'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const signUp = require('./routes/sign-up.js');
const signIn = require('./routes/sign-in.js')
const app = express();

const groupsRoute = require('./routes/groups.js');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(signUp);
app.use(signIn);

app.use(groupsRoute);

module.exports = {
  server: app,
  start: PORT => {
    if (!PORT) {throw new Error('Missing PORT')}
    app.listen(PORT, () => console.log('server is running on ', PORT))
  }
};