const UserListing = require("../models/userlisting.model");

class ListingRepository {
    async create(data) {
        return await UserListing.create(data);
    }

    async findByUserId(userId) {
        return await UserListing.findAll({
            where: {
                userId: userId
            }
        })
    }

    async updateByShowcaseIndex(showcaseIndex, data) {
        return await UserListing.update(data, {
            where: {
                showcaseIndex: showcaseIndex
            }
        })
    }

    async findByShowcaseIndex(showcaseIndex, userId) {
        return await UserListing.findOne({
            where: {
                showcaseIndex: showcaseIndex,
                userId: userId
            }
        })
    }

    async deleteByShowcaseIndex(showcaseIndex) {
        return await UserListing.destroy({
            where: {
                showcaseIndex: showcaseIndex
            }
        })
    }
}

module.exports = new ListingRepository();
