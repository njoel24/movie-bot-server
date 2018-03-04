// index.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const discoverMovie = require('./discoverMovie.js');

const app = express();

const movieGenres = [
    { id: 12, name: 'adventure' },
    { id: 14, name: 'fantasy' },
    { id: 16, name: 'animated' },
    { id: 16, name: 'animation' },
    { id: 18, name: 'drama' },
    { id: 27, name: 'horror' },
    { id: 28, name: 'action' },
    { id: 35, name: 'comedy' },
    { id: 36, name: 'history' },
    { id: 37, name: 'western' },
    { id: 53, name: 'thriller' },
    { id: 80, name: 'crime' },
    { id: 99, name: 'documentary' },
    { id: 878, name: 'sf' },
    { id: 878, name: 'sci fi' },
    { id: 878, name: 'sci-fi' },
    { id: 878, name: 'science fiction' },
    { id: 9648, name: 'mystery' },
    { id: 10402, name: 'music' },
    { id: 10749, name: 'romance' },
    { id: 10749, name: 'romantic' },
    { id: 10751, name: 'family' },
    { id: 10752, name: 'war' },
    { id: 10770, name: 'tv movie' }
  ];
  
  // Find the moviedb id of a genre entity
  function getGenreId(genre) {
    if (!genre) {
      return;
    }
    const row = movieGenres.find(function(elem) {
      return elem.name.toLowerCase() === genre.toLowerCase();
    });
  
    if (row) {
      return row.id;
    }
    return null;
  }

app.use(bodyParser.json());

// Recast will send a post request to /errors to notify important errors
// described in a json body
app.post('/errors', (req, res) => {
   console.error(req.json);
   res.sendStatus(200); 
});

app.post('/discover-movies', (req, res) => {

    const params = req.body;
    console.log(params);
    const genre = getGenreId(params.genre);
    const director = params.director;
    const actor = params.actor;
    const nationality = params.nationality;
    return discoverMovie(genre, director, actor, nationality)
      .then((carouselle) => res.json(carouselle))
      .catch((err) => console.error('movieApi::discoverMovie error: ', err));
  }); 

app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`));