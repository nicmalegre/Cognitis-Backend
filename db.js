const { Sequelize } = require('sequelize');


const db = new Sequelize('dblll', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

//bc656913221722:a4030ba3@us-cdbr-east-02.cleardb.com/heroku_4bef9b172bccd57

module.exports = db;

