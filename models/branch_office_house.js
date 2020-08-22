const { Sequelize, DataTypes } = require("sequelize");
const banks_branch_office = require("./banks_branch_office");
const products = require('./products');

const db = require("../db");

const branch_office_house = db.define(
  "branch_office_house",
  {
    branch_office_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    branch_office_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch_office_cuit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch_office_business_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    head_country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch_office_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch_tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch_office_fax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch_office_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch_office_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
    },
    company_house_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

branch_office_house.hasMany(banks_branch_office, {
  as: "bank_branch_office",
  foreignKey: "branch_office_id",
  sourceKey: "branch_office_id",
});

banks_branch_office.belongsTo(branch_office_house, {
  foreignKey: "branch_office_id",
});


branch_office_house.hasMany(products, {
  foreignKey: 'product_branch_office_id'
});

products.belongsTo(branch_office_house, {
  foreignKey: 'product_branch_office_id'
})

module.exports = branch_office_house;
