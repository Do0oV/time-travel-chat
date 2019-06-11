const { api_key, client_url } = require('../config');
const axios = require('axios')
const baseUrl = 'https://api.themoviedb.org/3';
const { Movie, Comment, User } = require('../models/movies');
const services = require('../services/movies');

exports.searchAPI = async (ctx) => {
  try {
    const { query } = ctx.params;
    const response = await axios.get(`${baseUrl}/search/movie?api_key=${api_key}&language=en-US&query=${query}&include_adult=false&sort_by=popularity.desc`);
    ctx.body = response.data.results;
    ctx.status = 200;
  } catch (e) {
    console.log(e.message); // eslint-disable-line no-console
    ctx.status = 500;
  }
};

exports.getMovieDetails = async (ctx) => {
  try {
    const { id } = ctx.params;
    const response = await axios.get(`${baseUrl}/movie/${id}?api_key=${api_key}&language=en-US`);
    ctx.body = response.data;
    ctx.status = 200;
  } catch (e) {
    console.log(e.message); // eslint-disable-line no-console
    ctx.status = 500;
  }
};

exports.addMovie = async (ctx) => {
  try {
    const { id } = ctx.params;
    const response = await axios.get(`${baseUrl}/movie/${id}?api_key=${api_key}&language=en-US`);
    const movie = new Movie({
      omdb_id: response.data.id,
      imdb_id: response.data.imdb_id,
      title: response.data.title,
      poster: response.data.poster_path,
      runtime: response.data.runtime,
      comments: [],
      share_link: null
    });
    await movie.save()
      .then(movie => {
        ctx.body = movie;
        ctx.status = 200;
      })
      .catch(err => {
        console.log(err);  // eslint-disable-line no-console
        ctx.status = 500;
      });
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    ctx.status = 500;
  }
};

exports.findOne = async (ctx) => {
  try {
    const { id } = ctx.params;
    const res = await Movie.findOne({_id: id});
    if (res) {
      ctx.body = res;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    ctx.status = 500;
  }
};

exports.searchOne = async (ctx) => {
  try {
    const { id } = ctx.params;
    const res = await Movie.findOne({omdb_id: id});
    if (res) {
      ctx.body = res;
      ctx.status = 200;
    } else {
      ctx.status = 201;
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    ctx.status = 500;
  }
};

exports.addComment = async (ctx) => {
  try {
    const { _id } = ctx.params;
    const { message, time , user } = ctx.request.body;
    const newComment = {
      user,
      message,
      time
    };
    const updated =  await services.setComment(_id, newComment)
    // returning the array of updated comments
    ctx.body = updated;
    ctx.status = 201;
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    ctx.status = 500;
  }
};

exports.createLink = async (ctx) => {
  try {
    const { _id } = ctx.params;
    const link = `${client_url}${_id}`;
    const updated = await services.setLink(_id, link);
    ctx.body = updated;
    ctx.status = 201
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    ctx.status = 500;
  }
};
