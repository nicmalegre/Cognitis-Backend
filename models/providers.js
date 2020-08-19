const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');


const providers = db.define('providers', {
    provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    provider_cuit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    provider_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    provider_tel: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    provider_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    provider_email: {
        type: DataTypes.STRING,
        allowNull: true,
    }}, 
    {
        timestamps: false,
        freezeTableName: true }
)

module.exports = providers;