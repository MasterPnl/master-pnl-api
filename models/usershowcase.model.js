'use strict';

const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../models');

class UserShowcaseModel extends Model {
}

UserShowcaseModel.init({
    userId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    showcaseIndex: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "UserShowcaseModel",
    tableName: "usershowcase",
    timestamps: false,
});

module.exports = UserShowcaseModel;
