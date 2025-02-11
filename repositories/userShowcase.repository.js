const UserShowcase = require("../models/usershowcase.model");

class UserShowcaseRepository {
    async findByShowcaseIndex(showcaseIndex) {
        return await UserShowcase.findOne({
            where: {
                showcaseIndex: showcaseIndex
            }
        });
    }

    async create(data) {
        return await UserShowcase.create(data);
    }

    async update(id, data) {
        return await UserShowcase.update(data, {
            where: {
                id: id
            }
        });
    }

    async findAll() {
        return await UserShowcase.findAll({
            attributes: ['userId', 'showcaseIndex'],
        })
    }

    async deleteByShowcaseIndex(showcaseIndex) {
        return await UserShowcase.destroy({
            where: {
                showcaseIndex: showcaseIndex
            }
        });
    }

    async getByUserId(userId) {
        return await UserShowcase.findAll({
            where: {
                userId: userId
            },
            attributes: ['showcaseIndex'],
        });
    }
}

module.exports = new UserShowcaseRepository();
