const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');


const products_providers = db.define('products_providers', {
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    provider_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    product_provider_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
      },
    }, 
    {
        timestamps: false,
        freezeTableName: true }
)

module.exports = products_providers;
