const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const head_house = db.define('head_house', {
    head_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    head_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    head_cuit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    head_business_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    head_country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    head_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    head_tel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    head_fax: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = head_house;