const axios = require('axios');
const config = require('./config.js');

function discoverMovie(genre, director, actor, nationality) {

  const params = {
    api_key: config.MOVIEDB_TOKEN,
    sort_by: 'popularity.desc'
  }

  if (genre) {
    params["with_genres"] = genre
  }

  return axios.get(`https://api.themoviedb.org/3/discover/movie`, {
    params: params,
  }).then(results => {
    if (results.length === 0) {
      return [{
        type: 'quickReplies',
        content: {
          title: 'Sorry, but I could not find any results for your request :(',
          buttons: [{ title: 'Start over', value: 'Start over' }],
        },
      }];
    }
    const cards = results.data.results.map(movie => ({
      title: movie.title || movie.name,
      subtitle: movie.overview,
      imageUrl: `https://image.tmdb.org/t/p/w640${movie.poster_path}`}));
    return [
      { type: 'carousel', content: cards.splice(0,10) },
    ];
  });
}

module.exports = discoverMovie;