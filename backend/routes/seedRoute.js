const router = require("express").Router();
const { initializeDatabase } = require("../controller/databaseController");

router.get("/initialize-database", initializeDatabase);

module.exports = router;
