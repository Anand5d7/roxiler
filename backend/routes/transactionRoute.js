const router = require("express").Router();

const { listTransactions } = require("../controller/transactionsController");

router.get("/transactions", listTransactions);

module.exports = router;
