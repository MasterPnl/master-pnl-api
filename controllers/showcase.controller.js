const ShowcaseService = require("../services/showcase.services");
const {createShowcaseScheme} = require("../validators/showcase.validator");

class ShowcaseController {
    async create(req, res) {
        try {
            const {error} = createShowcaseScheme.validate(req.body);
            if (error) return res.status(400).json({message: error.details[0].message});
            const showcase = await ShowcaseService.createShowcase(req.body);
            res.status(201).json(showcase);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async findOne(req, res) {
        try {
            const showcases = await ShowcaseService.findShowcase();
            res.status(200).json(showcases);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = new ShowcaseController();
