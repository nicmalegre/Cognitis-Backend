const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const banks_head_house = db.define(
  "banks_head_house",
  {
    bank_head_house_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    bank_head_house_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bank_head_house_account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_head_house_alias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bank_head_house_cbu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    head_id: {
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
