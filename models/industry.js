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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = industry;
