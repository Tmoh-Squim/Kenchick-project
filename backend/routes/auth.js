const express = require("express");
const { createUser, Login, ForgotPassword } = require("../controller/user");

const router = express.Router();

router.post("/create-user",createUser);
router.post("/login",Login);
router.post("/reset-password",ForgotPassword);

module.exports = router;