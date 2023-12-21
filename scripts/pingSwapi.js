const cron = require("node-cron");
const { fetchAndCacheAllData } = require("../models/swapiModel");

function swapiCron() {
  const cronIntervalInMinutes = process.env.CRON_INTERVAL_MINUTES || 30; // Default: every 30 minutes

  console.log(
    `CRON-JOB: Started - Running every ${cronIntervalInMinutes} minutes`
  );

  // Convert minutes to cron expression
  const cronExpression = `*/${cronIntervalInMinutes} * * * *`;
  // Cron job will call SWAPI API every cronIntervalInMinutes
  cron.schedule(cronExpression, async () => {
    try {
      await fetchAndCacheAllData();
      console.log("CRON-JOB: Task completed successfully");
    } catch (error) {
      console.error("Error pinging SWAPI API:", error.message);
    }
  });
  console.log("CRON-JOB: Ended");
}

module.exports = { swapiCron };
