'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const signUp = require('./routes/sign-up.js');
const signIn = require('./routes/sign-in.js')
const app = express();

const groupRoutes = require('./routes/groupRoutes.js');
const associationsRoutes = require('./routes/groupAssociationsRoutes');
const listRoutes = require('./routes/listRoutes.js');
const santaRoutes = require('./routes/santaRoutes');
const userRoutes = require('./routes/userRoutes');
const mailingRoutes = require('./routes/mailingRoute')

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(signUp);
app.use(signIn);

app.use(associationsRoutes);
app.use(listRoutes);
app.use(santaRoutes);
app.use(userRoutes);
app.use(groupRoutes);

app.use(mailingRoutes);

module.exports = {
  server: app,
  start: PORT => {
    if (!PORT) {throw new Error('Missing PORT')}
    app.listen(PORT, () => console.log('server is running on ', PORT))
  }
};