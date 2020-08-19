const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const permissions = db.define('permissions', {
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    permission_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = permissions;