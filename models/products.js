const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
//const sequelize = new Sequelize('mysql::memory:');
//const express = require("express");
//const router = express.Router();

const products = db.define('products', {
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_is_dollar: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    product_in_ecommerce: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    product_unit: {
        type: DataTypes.STRING(2),
        allowNull: true
    },
    product_vol:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    product_bultos: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    product_bultos_clientes: {
        type: DataTypes.INTEGER,
        allowNull: true
        //longitud
    },
    product_minimium_margin: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    product_maximium_margin: {
        type: DataTypes.SMALLINT,
        allowNull: true
    }
    ,
    product_price: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
    },
    product_bonification: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
    },
    product_price_bonification: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
    },
    product_freight_cost: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
    } 
    ,
    product_accountant_type: {
        type: DataTypes.STRING,
        allowNull: true
    }
    ,
    product_accountant_account: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_size: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: true
    }, 
    products_industry_id:{
        type: DataTypes.INTEGER,
        allowNull: false 
    }}, 
    {
        timestamps: false,
        freezeTableName: true }
)


module.exports = products;
