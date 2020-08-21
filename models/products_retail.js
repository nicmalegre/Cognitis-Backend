const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');


const products_retail = db.define('products_retail', {
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    product_line: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_seed: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_service: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_serie: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_NTecnico: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_technical_data: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    }, 
    {
        timestamps: false,
        freezeTableName: true }
)


module.exports = products_retail;
