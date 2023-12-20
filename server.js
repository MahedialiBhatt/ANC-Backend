const express = require("express");
const swapiRouter = require("./routes/swapi");
const { fetchAndCacheAllData } = require("./models/swapiModel");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

// endpoints
app.use("/api", swapiRouter);

app.use("/*", (req, res) => res.send("OK!!!"));

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await fetchAndCacheAllData().catch((e) => {});
});
