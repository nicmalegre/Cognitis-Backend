const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
//const sequelize = new Sequelize('mysql::memory:');
//const express = require("express");
//const router = express.Router();

const User = db.define('dbo_user', {
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
