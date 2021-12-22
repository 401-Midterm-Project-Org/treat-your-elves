'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const signIn = require('./routes/sign-in.js')
const app = express();

const groupRoutes = require('./routes/groupRoutes.js');
const associationsRoutes = require('./routes/groupAssociationsRoutes');
const listRoutes = require('./routes/listRoutes.js');
const santaRoutes = require('./routes/santaRoutes')

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(signIn);

app.use(associationsRoutes);
app.use(listRoutes);
app.use(santaRoutes);

app.use(groupRoutes);

module.exports = {
  server: app,
  start: PORT => {
    if (!PORT) {throw new Error('Missing PORT')}
    app.listen(PORT, () => console.log('server is running on ', PORT))
  }
};