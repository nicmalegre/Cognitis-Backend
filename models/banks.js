const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const banks = db.define('banks', {
    bank_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_acount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_alias: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = banks;