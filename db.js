const { Sequelize } = require('sequelize');


const db = new Sequelize('dblll', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = db;

