const Joi = require("joi");

const createUserShowcaseScheme = Joi.object({
    userId: Joi.number().required(),
    showcaseIndex: Joi.number().required(),
});

module.exports = {
    createUserShowcaseScheme,
};
