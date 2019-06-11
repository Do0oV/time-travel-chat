const { api_key, client_url } = require('../config');
const { Movie, Comment } = require('../models/movies');

exports.setComment = async (_id, comment) => {
  try {
    const { message, time , user } = comment;
    const newComment = new Comment({
      user,
      message,
      time
    });
    const updated = await Movie.findOneAndUpdate(
      {_id},
      {$push: {comments: newComment}},
      {new: true}
      );
    // returning the array of updated comments
    return updated;
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

exports.setLink = async (_id, link) => {
  try {
    const updated = await Movie.findOneAndUpdate(
      {_id},
      { $set: { share_link: link }},
      {new: true},
      (err, doc) => {
        if (err) console.log(err);
        else {
          return doc;
        }
      }
    );
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};
