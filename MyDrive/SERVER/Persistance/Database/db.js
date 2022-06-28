const Sequelize = require('sequelize');
const sequelize = new Sequelize('my_drive', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;