const express = require("express");
const { getAnswer } = require("../controller/chatbotdata");

const router = express.Router();
router.post('/question',getAnswer);

module.exports = router