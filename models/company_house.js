const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const company_house = db.define(
  "company_house",
  {
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_cuit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_business_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_fax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_house_industry_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    head_house_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bank_company_house_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = company_house;
