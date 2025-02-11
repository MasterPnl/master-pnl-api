'use strict';

const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../models');

class UserListingModel extends Model {}

UserListingModel.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    showcaseIndex: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    sequelize,
    modelName: "UserListing",
    tableName: "userlisting",
    timestamps: false,
});

module.exports = UserListingModel;
