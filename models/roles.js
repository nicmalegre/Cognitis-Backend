const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const roles = db.define(
  "roles",
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_status: {
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

module.exports = roles;
