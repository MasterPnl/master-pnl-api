'use strict';

const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../models');

class UserModel extends Model {
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false
});

module.exports = UserModel;
