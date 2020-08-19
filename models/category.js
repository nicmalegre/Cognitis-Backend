const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');


const category = db.define('category', {
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    }}, 
    {
        timestamps: false,
        freezeTableName: true }
)

module.exports = category;