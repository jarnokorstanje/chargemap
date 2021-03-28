'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.urlencoded({extended: false}));
app.use('/station', require('./routes'));

db.on('connected', () => {
  app.listen(3000);
});
