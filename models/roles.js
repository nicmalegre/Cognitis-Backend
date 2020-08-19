const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');


const roles = db.define('roles', {
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    }}, 
    {
        timestamps: false,
        freezeTableName: true 
    }
)

module.exports = roles;
