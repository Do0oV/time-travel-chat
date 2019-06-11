const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    allowNull: false
  },
  avatar: {
    type: String,
    allowNull: false
  }
});
const commentsSchema = new mongoose.Schema({
  user: {
    type: userSchema,
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
    type: [commentsSchema],
    allowNull: false,
    default: []
  },
  share_link: {
    type: String,
    allowNull: true,
    default: null
  }
});

exports.User = mongoose.model('user', userSchema);
exports.Movie = mongoose.model('movie', movieSchema);
exports.Comment = mongoose.model('comment', commentsSchema);

//module.exports = mongoose.model('movie', movieSchema);