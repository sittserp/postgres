const Movie = require('./lib/utils/models/Movie.js');
// require('dotenv').config();

// const express = require('express');
// const app = express();

// app.use(express.json());

Movie
    .insert({ title: 'Star Wars', description: 'A New Hope', url: 'http://url.com' })
    .then(console.log);

// app.listen('5432', () => { console.log('listening on port 5432') })