const User = require("../models/user.model");

class UserRepository {
    async findAll() {
        return await User.findAll({
            where: {
                isAdmin: false
            },
            attributes: ['id', 'username']
        });
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    async create(data) {
        return await User.create(data);
    }

    async update(id, data) {
        const user = await User.findByPk(id);
        if (!user) return null;
        return await user.update(data);
    }

    async delete(id) {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return user;
    }

    async findByUsername(username) {
        return await User.findOne({
            where: {
                username: username
            }
        });
    }
}

module.exports = new UserRepository();
