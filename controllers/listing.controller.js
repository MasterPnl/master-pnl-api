const UserServices = require("../services/user.services");
const ListingServices = require("../services/listing.services");
const UserShowcaseServices = require("../services/userShowcase.services");
const {createListingSchema} = require("../validators/listing.validator");
const UserListingPhotoModel = require("../models/userlistingphoto.model");
const deleteImageByPath = require("../utils/deleteImageByPath");
class ListingController {
    async getAll(req, res) {
        try {
            const user = await UserServices.getUserByUsername(req.user.username);
            const userShowcase = await UserShowcaseServices.getUserShowcaseByUserId(user.id);
            const listings = await ListingServices.findByUserId(user.id);
            res.json({
                userShowcase,
                listings
            });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async create(req, res) {
        try {
            const {error} = createListingSchema.validate(req.body);
            if (error) return res.status(400).json({message: error.details[0].message});
            const user = await UserServices.getUserByUsername(req.user.username);
            const listing = await ListingServices.create(req.body, user);
            res.status(201).json(listing);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async update(req, res) {
        try {
            const {error} = createListingSchema.validate(req.body);
            if (error) return res.status(400).json({message: error.details[0].message});
            const user = await UserServices.getUserByUsername(req.user.username);
            const userHasListing = await ListingServices.findByShowcaseIndex(
                req.params.showcaseIndex,
                user.id
            );
            if (!userHasListing) {
                return res.status(400).json({message: "Listing bulunamadı."});
            }
            const listing = await ListingServices.updateByShowcaseIndex(
                req.params.showcaseIndex,
                req.body
            );
            res.json(listing);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async delete(req, res) {
        try {
            const user = await UserServices.getUserByUsername(req.user.username);
            const userHasListing = await ListingServices.findByShowcaseIndex(
                req.params.showcaseIndex,
                user.id
            );
            if (!userHasListing) {
                return res.status(400).json({message: "Listing bulunamadı."});
            }
            const images = await UserListingPhotoModel.findAll({
                where: {
                    userId: user.id,
                    showcaseIndex: req.params.showcaseIndex
                }
            });
            for (const image of images) {
                deleteImageByPath({
                    imagePath: image.path,
                    onError: (err) => {
                        return res.status(500).json({message: 'Dosya silinemedi.'});
                    },
                    onSuccess: () => {
                        image.destroy();
                    }
                });
            }
            await ListingServices.deleteByShowcaseIndex(req.params.showcaseIndex);
            res.json({message: "İlan silindi!"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async uploadImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({message: 'Lütfen bir resim yükleyin!'});
            }
            const user = await UserServices.getUserByUsername(req.user.username);
            const image = await UserListingPhotoModel.create({
                userId: user.id,
                showcaseIndex: req.params.showcaseIndex,
                path: req.file.filename
            });
            res.json(image);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async images(req, res) {
        try {
            const user = await UserServices.getUserByUsername(req.user.username);
            const images = await UserListingPhotoModel.findAll({
                where: {
                    userId: user.id,
                    showcaseIndex: req.params.showcaseIndex
                }
            });
            let imagesList = images.map(image => ({
                id: image.id,
                path: image.path
            }));
            res.json(imagesList);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async deleteImage(req, res) {
        try {
            const { fileId } = req.params;
            const user = await UserServices.getUserByUsername(req.user.username);
            const image = await UserListingPhotoModel.findOne({
                where: {
                    id: fileId,
                    userId: user.id,
                }
            });
            if (!image) {
                return res.status(400).json({message: "Resim bulunamadı."});
            }
            deleteImageByPath({
                imagePath: image.path,
                onError: (err) => {
                    return res.status(500).json({message: 'Dosya silinemedi.'});
                },
                onSuccess: () => {
                    image.destroy();
                    return res.json({message: 'Dosya silindi!'});
                }
            });

        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = new ListingController();
