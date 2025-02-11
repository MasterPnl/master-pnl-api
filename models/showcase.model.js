'use strict';

const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../models');

class ShowcaseModel extends Model {
}

ShowcaseModel.init({
    platinum: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    gold: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    silver: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "Showcase",
    tableName: "showcase",
    timestamps: false,
});

module.exports = ShowcaseModel;
