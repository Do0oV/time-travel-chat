const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');

const router = require('./router.js');

const app = new Koa();
const port = 3003;

app
  .use(cors())
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, (err) => {
  if (err) return console.log(err); // eslint-disable-line no-console
  console.log(`Server listening on port ${port}`); // eslint-disable-line no-console
});