const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const banks_head_house = db.define(
  "banks_head_house",
  {
    bank_headhouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    bank_headhouse_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_headhouse_acount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_headhouse_cbu: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
  },
    bank_headhouse_alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headhouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = banks_head_house;
