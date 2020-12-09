require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const Movie = require('./lib/utils/models/Movie.js');
const Beverage = require('./lib/utils/models/Beverage.js');

// Movie Routes Here: 

app.post('/movies', (req, res) => {
  Movie
    .insert(req.body) 
    .then(movie => res.send(movie));
});

app.get('/movies', (req, res) => {
  Movie
    .find()
    .then(movie => res.send(movie));
});

app.get('/movies/:id', (req, res) => {
  Movie
    .findById(req.params.id)
    .then(movie => res.send(movie));
});

app.put('/movies/:id', (req, res) => {
  Movie
    .update(req.params.id, req.body)
    .then(movie => res.send(movie));
});

app.delete('/movies/:id', (req, res) => {
  Movie
    .delete(req.params.id)
    .then(movie => res.send(movie));
});

// Beverage Routes Here: 

app.post('/beverages', (req, res) => {
  Beverage
    .insert(req.body) 
    .then(beverage => res.send(beverage));
});
  
app.get('/beverages', (req, res) => {
  Beverage
    .find()
    .then(beverage => res.send(beverage));
});
  
app.get('/beverages/:id', (req, res) => {
  Beverage
    .findById(req.params.id)
    .then(beverage => res.send(beverage));
});
  
app.put('/beverages/:id', (req, res) => {
  Beverage
    .update(req.params.id, req.body)
    .then(beverage => res.send(beverage));
});
  
app.delete('/beverages/:id', (req, res) => {
  Beverage
    .delete(req.params.id)
    .then(beverage => res.send(beverage));
});

module.exports = app;


