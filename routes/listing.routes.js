const express = require("express");
const ListingController = require("../controllers/listing.controller");
const {verifyToken} = require("../middleware/auth.middleware");
const upload = require("../utils/imageUpload");
const UserServices = require("../services/user.services");
const UserListingPhotoModel = require("../models/userlistingphoto.model");

const router = express.Router();

router.get("/", verifyToken, ListingController.getAll);
router.post("/", verifyToken, ListingController.create);
router.delete("/:showcaseIndex", verifyToken, ListingController.delete);
router.put("/:showcaseIndex", verifyToken, ListingController.update);
router.get("/:showcaseIndex/images", verifyToken, ListingController.images);
router.post(
    "/:showcaseIndex/image",
    verifyToken,
    async (req, res, next) => {
        const user = await UserServices.getUserByUsername(req.user.username);
        const images = await UserListingPhotoModel.count({
            where: {
                userId: user.id,
                showcaseIndex: req.params.showcaseIndex,
            }
        });
        if (images >= 3) {
            return res.status(400).json({message: 'En fazla 3 resim yükleyebilirsiniz!'});
        }
        upload.single('image')(req, res, (err) => {
            if (err) {
                return res.status(400).json({message: err.message});
            }
            next();
        });
    },
    ListingController.uploadImage);

router.delete("/:fileId/image", verifyToken, ListingController.deleteImage);


module.exports = router;
