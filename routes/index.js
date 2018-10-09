const Router = require('koa-router');
const router = new Router();
const todo = require('./todo');

router.get('/', async (ctx) => {
    ctx.body = 'hello,my koa app !'
});

router.use(`/api/v1/todo`, todo.routes());

module.exports = router;