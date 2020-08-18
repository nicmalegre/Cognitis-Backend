const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
//const sequelize = new Sequelize('mysql::memory:');
//const express = require("express");
//const router = express.Router();

const user = db.define('users', {
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
    passwordExpired: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    }}, 
    {
        timestamps: false,
        freezeTableName: true }
)


module.exports = user;
