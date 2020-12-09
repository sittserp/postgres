const fs = require('fs');
const request = require('supertest');
const app = require('../index');
const Movie = require('../lib/utils/models/Movie');
const Beverage = require('../lib/utils/models/Beverage');
const pool = require('../lib/utils/pool');

describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a movie via POST', async() => {
    const response = await request(app)
      .post('/movies')
      .send({
        title: 'Indiana Jones',
        description: 'JONES!!!',
        url: 'http://someurl.someurl.com/'
      });

    expect(response.body).toEqual({
      id: '1',
      title: 'Indiana Jones',
      description: 'JONES!!!',
      url: 'http://someurl.someurl.com/'
    });
  });

  it('finds all movies via GET', async() => {
    await Movie.insert({
      title: 'Indiana Jones',
      description: 'JONES!!!',
      url: 'http://someurl.someurl.com/'
    });

    const response = await request(app)
      .get('/movies');

    expect(response.body).toEqual([{
      id: '1',
      title: 'Indiana Jones',
      description: 'JONES!!!',
      url: 'http://someurl.someurl.com/'
    }]);
  });

  it('finds a movie by id via GET', async() => {
    const movie = await Movie.insert({ 
      title: 'Raiders', 
      description: 'adventure', 
      url: 'http://someurl.adventure' });

    const response = await request(app)
      .get(`/movies/${movie.id}`);

    expect(response.body).toEqual(movie);
  });

  it('updates a movie by id via PUT', async() => {
    const movie = await Movie.insert({
      title: 'Last Crusade', 
      description: 'adventure', 
      url: 'http://someurl.adventure' });

    const response = await request(app)
      .put(`/movies/${movie.id}`)
      .send({
        title: 'Temple of Doom',
        description: 'adventurous',
        url: 'someurl.com'
      });

    expect(response.body).toEqual({
      ...movie,
      title: 'Temple of Doom',
      description: 'adventurous',
      url: 'someurl.com'
    });
  });

  it('deletes a movie by id via DELETE', async() => {
    const movie = await Movie.insert({ 
      title: 'Raiders - DELETE ME PLZ', 
      description: 'adventure', 
      url: 'http://someurl.adventure' });

    const response = await request(app)
      .delete(`/movies/${movie.id}`);

    expect(response.body).toEqual(movie);
  });

  // creating dev branch for Beverage class, and tests will go here: 

  it('creates a beverage via POST', async() => {
    const response = await request(app)
      .post('/beverages')
      .send({
        title: 'water',
        description: 'wet',
        cold: true
      });

    expect(response.body).toEqual({
      id: '1',
      title: 'water',
      description: 'wet',
      cold: true
    });
  });

  it('finds all beverages via GET', async() => {
    await Beverage.insert({
      title: 'beer',
      description: 'lager',
      cold: true
    });

    const response = await request(app)
      .get('/beverages');

    expect(response.body).toEqual([{
      id: '1',
      title: 'beer',
      description: 'lager',
      cold: true
    }]);
  });

  it('finds a beverage by id via GET', async() => {
    const beverage = await Beverage.insert({ 
      title: 'coffee', 
      description: 'Guatemalan', 
      cold: false });

    const response = await request(app)
      .get(`/beverages/${beverage.id}`);

    expect(response.body).toEqual(beverage);
  });

  it('updates a beverage by id via PUT', async() => {
    const beverage = await Beverage.insert({
      title: 'tea', 
      description: 'black', 
      cold: false });

    const response = await request(app)
      .put(`/beverages/${beverage.id}`)
      .send({
        title: 'tea',
        description: 'green',
        cold: true
      });

    expect(response.body).toEqual({
      ...beverage,
      title: 'tea',
      description: 'green',
      cold: true
    });
  });

  it('deletes a beverage by id via DELETE', async() => {
    const beverage = await Beverage.insert({ 
      title: 'wine - DELETE ME PLZ', 
      description: 'red', 
      cold: true });

    const response = await request(app)
      .delete(`/beverages/${beverage.id}`);

    expect(response.body).toEqual(beverage);
  });


});
