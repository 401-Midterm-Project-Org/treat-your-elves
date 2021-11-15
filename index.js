'use strict';

require('dotenv').config();

const app = require('./src/server.js');

const PORT = process.env.PORT;

app.start(PORT)
