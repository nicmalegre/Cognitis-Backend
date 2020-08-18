const { Sequelize } = require('sequelize');

//barcelona = password of user root

//const db = new Sequelize('dblll', 'root', 'barcelona', {
//  host: 'localhost',
//  dialect: 'mysql'
//});

const db = new Sequelize('heroku_4bef9b172bccd57', 'bc656913221722', 'a4030ba3', {
  host: 'us-cdbr-east-02.cleardb.com',
  dialect: 'mysql'
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = db;

