const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');

const router = require('./router.js');

const app = new Koa();
require('dotenv').config();
const { PORT } = process.env;

const errorHandler = require('./errorHandler');

app
  .use(cors())
  .use(bodyparser())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, (err) => {
  if (err) return console.log(err); // eslint-disable-line no-console
  console.log(`Server listening on port ${PORT}`); // eslint-disable-line no-console
});