const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
//const sequelize = new Sequelize('mysql::memory:');
//const express = require("express");
//const router = express.Router();

const products_images = db.define('products_images', {
    product_image_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen_product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, 
    {
        timestamps: false,
        freezeTableName: true }
)


module.exports = products_images;
