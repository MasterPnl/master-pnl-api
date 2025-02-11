const Joi = require("joi");

const createListingSchema = Joi.object({
    showcaseIndex: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    phone: Joi.string().required(),
});

module.exports = {
    createListingSchema
};
