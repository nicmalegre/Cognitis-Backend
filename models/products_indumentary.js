const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');


const products_indumentary = db.define('products_indumentary', {
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    product_curve: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_season: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, 
    {
        timestamps: false,
        freezeTableName: true }
)


module.exports = products_indumentary;
