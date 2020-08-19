const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const roles = db.define('roles', {
    roles_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    roles_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roles_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = permissions;