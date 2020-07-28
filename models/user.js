const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db')

const User = sequelize.define('User', {
    product: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = User;