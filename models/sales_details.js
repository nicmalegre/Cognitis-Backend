const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");
//const sequelize = new Sequelize('mysql::memory:');
//const express = require("express");
//const router = express.Router();

const sales_details = db.define(
  "sales_details",
  {
    sales_details_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sales_details_sales_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_products_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sales_details_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sales_details_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = user;
