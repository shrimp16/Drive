const Sequelize = require('sequelize');
const database = require('../db');
const User = require('./users');

const File = database.define('file', {
    fileID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dir: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fileType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fileSize: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

File.belongsTo(User, {
    constraint: true,
    foreignKey: 'userID'
})

module.exports = File;