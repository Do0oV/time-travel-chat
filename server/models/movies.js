const mongoose = require('../db');

const commentsSchema = new mongoose.Schema({
  username: {
    type: String,
    allowNull: false
  },
  message: {
    type: String,
    allowNull: false
  },
  time: {
    type: Number,
    allowNull: false
  }
});

const movieSchema = new mongoose.Schema({
  omdb_id: {
    type: String,
    allowNull: false
  },
  imdb_id: {
    type: String,
    allowNull: false
  },
  title: {
    type: String,
    allowNull: false
  },
  poster: {
    type: String,
    allowNull: false
  },
  runtime: {
    type: Number,
    allowNull: false
  },
  comments: {
    type: Array,
    allowNull: false,
    default: []
  },
  share_link: {
    type: String,
    allowNull: true,
    default: null
  }
});

exports.Movie = mongoose.model('movie', movieSchema);
exports.Comment = mongoose.model('comment', commentsSchema);

//module.exports = mongoose.model('movie', movieSchema);