const Sequelize = require('sequelize');
const database = require('../db');
const User = require('./users');

const Limit = database.define('limit', {
    limit: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    usage: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    userID: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true
    }
})

Limit.belongsTo(User, {
    constraint: true,
    foreignKey: 'userID'
})

module.exports = Limit;