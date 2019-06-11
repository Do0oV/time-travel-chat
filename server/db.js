const mongoose = require('mongoose');
require('dotenv').config();

const { DB_USER , DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true,
  auth: {authdb:"admin"} }, (err) => {
  if (err) return console.log(err); // eslint-disable-line no-console
  console.log('Connected to the database'); // eslint-disable-line no-console
});
mongoose.set('useFindAndModify', false);

module.exports = mongoose;