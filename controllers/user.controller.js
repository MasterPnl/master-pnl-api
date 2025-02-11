const UserServices = require("../services/user.services");

const {
    createUserSchema,
    updateUserSchema,
} = require("../validators/user.validator");

class UserController {
    async getAll(req, res) {
        try {
            const users = await UserServices.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async getOne(req, res) {
        try {
            const user = await UserServices.getUserById(req.params.id);
            if (!user) return res.status(404).json({message: "Kullanıcı bulunamadı."});
            res.json(user);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async create(req, res) {
        try {
            const {error} = createUserSchema.validate(req.body);
            if (error) return res.status(400).json({message: error.details[0].message});
            const user = await UserServices.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async update(req, res) {
        try {
            const {error} = updateUserSchema.validate(req.body);
            if (error) return res.status(400).json({message: error.details[0].message});

            const user = await UserServices.updateUser(req.params.id, req.body);
            if (!user) return res.status(404).json({message: "Kullanıcı bulunamadı."});
            res.json(user);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async delete(req, res) {
        try {
            const user = await UserServices.deleteUser(req.params.id);
            if (!user) return res.status(404).json({message: "Kullanıcı bulunamadı."});
            res.json({message: "Kullanıcı silindi."});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = new UserController();
