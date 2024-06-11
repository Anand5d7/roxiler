const router = require("express").Router();

const statisticsController = require("../controller/statisticsController");

router.get("/statistics", statisticsController);

module.exports = router;
