'use strict';

const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../models');

class UserListingPhotoModel extends Model {}

UserListingPhotoModel.init({
    showcaseIndex: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING(1024),
        allowNull: true,
    }
}, {
    sequelize,
    modelName: "UserListingPhoto",
    tableName: "userlistingphoto",
    timestamps: false,
});

module.exports = UserListingPhotoModel;
