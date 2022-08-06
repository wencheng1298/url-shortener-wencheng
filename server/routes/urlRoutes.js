const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

router.route(`/shorten`).post(urlController.createUrl);
router.route(`/:shortUrl`).get(urlController.getUrl);

module.exports = router;
