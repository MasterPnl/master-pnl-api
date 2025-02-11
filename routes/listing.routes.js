const express = require("express");
const ListingController = require("../controllers/listing.controller");
const {verifyToken} = require("../middleware/auth.middleware");
const upload = require("../utils/imageUpload");

const router = express.Router();

router.get("/", verifyToken, ListingController.getAll);
router.post("/", verifyToken, ListingController.create);
router.delete("/:showcaseIndex", verifyToken, ListingController.delete);
router.put("/:showcaseIndex", verifyToken, ListingController.update);
router.get("/:showcaseIndex/images", verifyToken, ListingController.images);
router.post(
    "/:showcaseIndex/image",
    verifyToken,
    (req, res, next) => {
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
