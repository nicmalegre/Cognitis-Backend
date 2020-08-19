const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const category = db.define(
  "category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_status: {
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

module.exports = category;
