const axios = require("axios");
const NodeCache = require("node-cache");
const { SWAPI_CACHE_ALL_PEOPLE_DATA } = require("../utils/constant");

const apiCache = new NodeCache({ stdTTL: 600 }); // Cache TTL set to 10 minutes

async function fetchAndCacheAllData() {
  const allData = [];

  const allCachedData = apiCache.get(SWAPI_CACHE_ALL_PEOPLE_DATA);

  if (allCachedData) {
    return allCachedData;
  }

  try {
    let page = 1;
    let response;

    do {
      response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
      allData.push(...response.data.results);
      page++;
    } while (response.data.next); // Continue fetching until there are no more pages
  } catch (error) {
    console.error("Error fetching data from SWAPI:", error.message);
    throw new Error("SWAPI API server error");
  }

  apiCache.set(SWAPI_CACHE_ALL_PEOPLE_DATA, allData);

  console.log(
    "SWAPI People data successfully loaded! May the Force be with you!"
  );

  return allData;
}

module.exports = { apiCache, fetchAndCacheAllData };
