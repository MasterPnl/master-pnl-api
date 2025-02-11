const express = require("express");
const ShowcaseController = require("../controllers/showcase.controller");
const {verifyToken, isAdmin} = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", verifyToken, isAdmin, ShowcaseController.create);
router.get("/", verifyToken, ShowcaseController.findOne);

module.exports = router;
