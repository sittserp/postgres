require('dotenv').config();

const Movie = require('./lib/utils/models/Movie.js');

// const express = require('express');
// const app = express();

// app.use(express.json());

Movie
  .find() 
  .then(console.log);

// app.listen('5432', () => { console.log('listening on port 5432') })

