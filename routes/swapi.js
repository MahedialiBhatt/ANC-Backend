const express = require("express");
const router = express.Router();

const swapiController = require("../controllers/swapiController");

router.get("/people", async (req, res) => {
  return await swapiController.fetchPeople(req, res);
});

router.get("/people/:id", async (req, res) => {
  return await swapiController.people(req, res);
});

module.exports = router;
