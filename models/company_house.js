const { Sequelize, DataTypes } = require("sequelize");
const branch_office_house = require("./branch_office_house");
const banks_company_house = require("./banks_company_house");
const db = require("../db");

const company_house = db.define(
  "company_house",
  {
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
      unique: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_cuit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_business_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_fax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_house_industry_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    head_house_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_status: {
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

company_house.hasMany(branch_office_house ,{foreignKey:'company_house_id', sourceKey:'company_id'});
branch_office_house.belongsTo(company_house, {foreignKey:'company_house_id', sourceKey:'company_id'});

company_house.hasMany(banks_company_house ,{as:"bankcompany",foreignKey:'company_id', sourceKey:'company_id'});
banks_company_house.belongsTo(company_house,{foreignKey:'company_id', sourceKey:'company_id'})

module.exports = company_house;
