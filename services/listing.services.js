const ListingRepository = require("../repositories/listing.repository");

class ListingServices {
  async create(data, user) {
    const insert = {...data, userId: user.id};
    return await ListingRepository.create(insert);
  }

  async findByShowcaseIndex(showcaseIndex, userId) {
    return await ListingRepository.findByShowcaseIndex(showcaseIndex, userId);
  }

  async findByUserId(userId) {
    return await ListingRepository.findByUserId(userId);
  }

  async updateByShowcaseIndex(showcaseIndex, data) {
    return await ListingRepository.updateByShowcaseIndex(showcaseIndex, data);
  }

  async deleteByShowcaseIndex(showcaseIndex) {
    return await ListingRepository.deleteByShowcaseIndex(showcaseIndex);
  }
}

module.exports = new ListingServices();
