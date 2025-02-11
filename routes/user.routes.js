const express = require("express");
const UserController = require("../controllers/user.controller");
const {verifyToken, isAdmin} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", verifyToken, isAdmin, UserController.getAll);
router.get("/:id", verifyToken, isAdmin, UserController.getOne);
router.post("/", verifyToken, isAdmin, UserController.create);
router.put("/:id", verifyToken, isAdmin, UserController.update);
router.delete("/:id", verifyToken, isAdmin, UserController.delete);

module.exports = router;
