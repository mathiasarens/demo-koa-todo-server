const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./routes');
const koaqs = require('koa-qs');
const logger = require('koa-logger');

const app = new Koa();

// Use the qs library instead of querystring to support nested objects.
koaqs(app);

// error handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || err.code;
        ctx.body = {
            success: false,
            message: err.message,
        };
    }
});

app
    .use(logger())
    .use(bodyparser())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app;
