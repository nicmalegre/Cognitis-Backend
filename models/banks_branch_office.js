const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const banks_branch_office = db.define(
  "banks_branch_office",
  {
    banks_branch_office_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    banks_branch_office_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banks_branch_office_account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    banks_branch_office_alias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banks_branch_office_cbu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bank_branch_office_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1
    },
    branch_office_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = banks_branch_office;