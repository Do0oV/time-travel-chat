const Router = require('koa-router');
const router = new Router();

const ctrl = require('./controllers/movies');

router
  .get('/search/:query', ctrl.searchAPI)
  .get('/details/:id', ctrl.getMovieDetails)
  .get('/create/:id', ctrl.addMovie)
  .get('/movie/:id', ctrl.findOne)
  .get('/check/:id', ctrl.searchOne)
  .put('/comment/:_id', ctrl.addComment);

module.exports = router;
