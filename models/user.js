const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const user = db.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_mail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_password_expired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    user_branch_office_house_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    users_role_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_status: {
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
