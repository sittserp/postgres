const fs = require('fs');
const request = require('supertest');
const app = require('../index');
const Movie = require('../lib/utils/models/Movie');
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

});
