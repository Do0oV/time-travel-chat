const Router = require('koa-router');
const router = new Router();

const ctrl = require('./controllers/movies');

router
  .get('/search/:query', ctrl.searchAPI)
  .get('/details/:id', ctrl.getMovieDetails)
  .post('/create/:id', ctrl.addMovie)
  .put('/comment/:_id', ctrl.addComment);

module.exports = router;
