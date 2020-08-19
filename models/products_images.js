const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

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
    image_product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image_product_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
    }
}, 
    {
        timestamps: false,
        freezeTableName: true }
)


module.exports = products_images;
