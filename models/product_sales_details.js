const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const products_sale_details = db.define('products_sales_details', {
    product_sales_detail_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sale_detail_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, 
    {
        timestamps: false,
        freezeTableName: true }
)


module.exports = products_sale_details;
