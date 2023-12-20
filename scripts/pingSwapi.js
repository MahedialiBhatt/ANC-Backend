const axios = require("axios");
const cron = require("node-cron");

// SWAPI API endpoint
const swapiApiUrl = "https://swapi.dev/api/people/";

function swapiCron() {
  // Cron job to ping SWAPI API every 15 minutes (adjust the cron expression as needed)
  cron.schedule("*/15 * * * *", async () => {
    try {
      // Ping the SWAPI API
      const response = await axios.get(swapiApiUrl);
      console.log(`SWAPI /people API pinged successfully at ${new Date()}`);
    } catch (error) {
      console.error("Error pinging SWAPI API:", error.message);
    }
  });
}

module.exports = { swapiCron };
