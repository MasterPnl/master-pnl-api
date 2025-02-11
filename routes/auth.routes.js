const AuthController = require("../controllers/auth.controller");
const express = require("express");
const {verifyToken} = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

// bu endpoint sadece admin için oluşturuldu production ortamında kullanılmayacak
// router.get("/create-admin", AuthController.createAdmin);

module.exports = router;
