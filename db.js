const { Sequelize } = require('sequelize');


const db = new Sequelize('heroku_4bef9b172bccd57', 'bc656913221722', 'a4030ba3', {
  host: 'us-cdbr-east-02.cleardb.com',
  dialect: 'mysql'
});

module.exports = db;

