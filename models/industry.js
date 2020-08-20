const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const industry = db.define(
  "industry",
  {
    industry_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    industry_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = industry;
