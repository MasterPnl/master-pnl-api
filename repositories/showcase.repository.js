const Showcase = require("../models/showcase.model");

class ShowcaseRepository {
    async create(data) {
        return await Showcase.create(data);
    }

    async truncate() {
        await Showcase.truncate()
    }

    async findOne() {
        return await Showcase.findOne({
            attributes: ['platinum', 'gold', 'silver'],
        });
    }
}

module.exports = new ShowcaseRepository();
