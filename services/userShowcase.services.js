const UserShowcaseRepository = require("../repositories/userShowcase.repository");

class UserShowcaseServices {
    async createUserShowcase(data) {
        const existingUserShowcase = await UserShowcaseRepository.findByShowcaseIndex(data.showcaseIndex);
        if (existingUserShowcase) {
            await UserShowcaseRepository.update(existingUserShowcase.id, data);
            return {
                id: existingUserShowcase.id, ...data
            };
        }
        return await UserShowcaseRepository.create(data);
    }

    async getAllUserShowcases() {
        return await UserShowcaseRepository.findAll();
    }

    async getUserShowcaseByUserId(userId) {
        return await UserShowcaseRepository.getByUserId(userId);
    }

    async deleteUserShowcase(showcaseIndex) {
        return await UserShowcaseRepository.deleteByShowcaseIndex(showcaseIndex);
    }
}

module.exports = new UserShowcaseServices();
