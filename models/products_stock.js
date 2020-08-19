const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
//const sequelize = new Sequelize('mysql::memory:');
//const express = require("express");
//const router = express.Router();

const products_stock = db.define('products_stock', {
    product_sku:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    product_state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, 
    {
        timestamps: false,
        freezeTableName: true }
)


module.exports = products_stock;
