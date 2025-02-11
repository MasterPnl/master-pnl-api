const ShowcaseRepository = require("../repositories/showcase.repository");

class ShowcaseServices {
    async createShowcase(data) {
        await ShowcaseRepository.truncate();
        return await ShowcaseRepository.create(data);
    }

    async findShowcase() {
        const showcase = await ShowcaseRepository.findOne();
        if (!showcase) {
            return await ShowcaseRepository.create({
                platinum: 2,
                gold: 3,
                silver: 4,
            });
        }
        return await ShowcaseRepository.findOne()
    }
}

module.exports = new ShowcaseServices();
