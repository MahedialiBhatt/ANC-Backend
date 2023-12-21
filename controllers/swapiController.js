const { apiCache, fetchAndCacheAllData } = require("../models/swapiModel");
const { writeResponse } = require("../utils/utility");

async function people(req, res) {
  const { id } = req.params;

  const peopleIdx = parseInt(id);

  if (isNaN(peopleIdx)) {
    return writeResponse(
      {
        code: 400,
        message:
          "Invalid request: The provided people index is not a valid number.",
      },
      null,
      res
    );
  }

  const allData = await fetchAndCacheAllData();

  const cacheKey = `PEOPLE_DATA_ID_${peopleIdx}`;

  // Check if the data is already cached
  let cachedData = apiCache.get(cacheKey);

  if (cachedData) {
    return writeResponse(null, cachedData, res);
  }

  cachedData = allData[id];

  apiCache.set(cacheKey, cachedData);

  return writeResponse(null, cachedData, res);
}

async function fetchPeople(req, res) {
  try {
    const allData = await fetchAndCacheAllData();

    const cacheKey = `PEOPLE_DATA_${JSON.stringify(req.query)}`;

    // Check if the data is already cached
    let cachedData = apiCache.get(cacheKey);

    if (cachedData) {
      return writeResponse(null, cachedData, res);
    }

    const { limit, offset, search, sortBy, orderBy } = req.query;

    // Filter data based on search
    let filteredData = allData;
    if (search) {
      const searchQuery = search.toLowerCase();
      filteredData = allData.filter((person) =>
        person.name.toLowerCase().includes(searchQuery)
      );
    }

    // Sort data
    if (sortBy && orderBy) {
      filteredData.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];
        const order = orderBy === "asc" ? 1 : -1;

        if (valueA < valueB) return -1 * order;
        if (valueA > valueB) return 1 * order;
        return 0;
      });
    }

    // Paginate data
    const startIndex = offset || 0;
    const endIndex = startIndex + (limit || filteredData.length);
    cachedData = filteredData.slice(startIndex, endIndex);

    apiCache.set(cacheKey, cachedData);

    return writeResponse(null, cachedData, res);
  } catch (error) {
    console.error("Error fetching people:", error.message);
    return writeResponse(
      {
        code: 500,
        message: "Something went wrong while fetching people's data.",
      },
      null,
      res
    );
  }
}

module.exports = { people, fetchPeople };
