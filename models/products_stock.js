const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');


const products_stock = db.define('products_stock', {
    product_sku: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    product_state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }}, 
    {
        timestamps: false,
        freezeTableName: true }
)

module.exports = products_stock;