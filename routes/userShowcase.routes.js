const express = require("express");
const UserShowcaseController = require("../controllers/userShowcase.controller");
const {verifyToken, isAdmin} = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", verifyToken, isAdmin, UserShowcaseController.create);
router.get("/", verifyToken, isAdmin, UserShowcaseController.getAll);
router.delete("/:showcaseIndex", verifyToken, isAdmin, UserShowcaseController.delete);

module.exports = router;
