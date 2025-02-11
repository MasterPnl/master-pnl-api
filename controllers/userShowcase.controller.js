const UserShowcaseService = require("../services/userShowcase.services");
const {createUserShowcaseScheme} = require("../validators/userShowcase.validator");

class UserShowcaseController {
    async create(req, res) {
        try {
            const {error} = createUserShowcaseScheme.validate(req.body);
            if (error) return res.status(400).json({message: error.details[0].message});
            const userShowCase = await UserShowcaseService.createUserShowcase(req.body)
            res.status(201).json(userShowCase);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async getAll(req, res) {
        try {
            const userShowCase = await UserShowcaseService.getAllUserShowcases();
            res.status(200).json(userShowCase);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async delete(req, res) {
        try {
            const userShowCase = await UserShowcaseService.deleteUserShowcase(req.params.showcaseIndex);
            if (!userShowCase) return res.status(404).json({message: "Kullanıcı showcase bulunamadı"});
            res.status(200).json(userShowCase);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = new UserShowcaseController();
