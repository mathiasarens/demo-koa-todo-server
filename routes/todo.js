const Router = require('koa-router');
const router = new Router();
const models = require('../models');
const validate = require('koa2-validation');
const Joi = require('joi');

router.get('/', async (ctx, next) => {

    const todos = await models.todo.findAll();

    ctx.body = todos;

    await next();
});


router.post('/', validate({
    body: {
        id: Joi.number().required(),
        name: Joi.string().required(),
        until: Joi.string()
    }
}), async (ctx, next) => {

    await models.todo.create(ctx.request.body);

    const todos = await models.todo.findAll();

    ctx.body = todos;

    await next();
});

module.exports = router;