module.exports = (sequelize, DataTypes) => {
    const todo = sequelize.define('todo', {
        id: {
            type: DataTypes.DECIMAL,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        until: {
            type: DataTypes.STRING
        }
    });
    return todo;
};