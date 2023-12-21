const express = require("express");
const swapiRouter = require("./routes/swapi");
// const { fetchAndCacheAllData } = require("./models/swapiModel");
const { swapiCron } = require("./scripts/pingSwapi");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

swapiCron();

// endpoints
app.use("/api", swapiRouter);

app.use("/*", (req, res) => res.send("OK!!!"));

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  // Uncomment it, if we disable cronjob
  // await fetchAndCacheAllData().catch((e) => {});
});
