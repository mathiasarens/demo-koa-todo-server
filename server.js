const app = require('./app');
const models = require('./models');
const PORT = process.env.PORT || 9999;

const serverPromise = models.sequelize.sync({force: true})
    .then(() => {
        models.todo.create({
            id: Date.now(),
            name: 'Clean kitchen',
            until: 'Tuesday'
        });
    }).then(() => {
        return app.listen(PORT, () => {
            console.log(`Server listening on port: ${PORT}`);
        });
    });

module.exports = serverPromise;