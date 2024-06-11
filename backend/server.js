// dotenv
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

// database
const configDB = require("./config/db.js");

app.use(express.json());

// routes
const seedRoute = require("./routes/seedRoute");
const transactionRoute = require("./routes/transactionRoute");
const statisticsRoute = require("./routes/statisticsRoute");

app.use("/api", seedRoute);
app.use("/api", transactionRoute);
app.use("/api", statisticsRoute);

// production

app.use(express.static(path.join(path.resolve(), "/frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(path.resolve(), "frontend", "dist", "index.html"))
);

app.listen(process.env.PORT, () => {
  configDB();
  console.log("server up");
});
