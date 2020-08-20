const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const banks_company_house = db.define(
  "banks_company_house",
  {
    bank_company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    bank_company_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bank_company_account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_company_alias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bank_company_cbu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = banks_company_house;