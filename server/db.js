const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db_time_travel_chat', { useNewUrlParser: true }, (err) => {
  if (err) return console.log(err); // eslint-disable-line no-console
  console.log('Connected to the database'); // eslint-disable-line no-console
});
mongoose.set('useFindAndModify', false);

module.exports = mongoose;