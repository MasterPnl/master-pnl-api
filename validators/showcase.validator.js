const Joi = require("joi");

const createShowcaseScheme = Joi.object({
    platinum: Joi.number().required(),
    gold: Joi.number().required(),
    silver: Joi.number().required(),
});

module.exports = {
    createShowcaseScheme,
};
