// countryInfoService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getCountryInfo = async (countryName) => {
  const apiUrl = `https://api.siputzx.my.id/api/tools/countryInfo?name=${encodeURIComponent(countryName)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Country Info API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.status || !data.data) {
      throw new Error("Invalid Country Info API response structure");
    }

    const country = data.data;

    return {
      metadata: {
        originalQuery: data.searchMetadata.originalQuery,
        matchedCountry: data.searchMetadata.matchedCountry,
        matchConfidence: data.searchMetadata.similarity
      },
      basicInfo: {
        name: country.name,
        capital: country.capital,
        flag: country.flag,
        phoneCode: country.phoneCode,
        googleMaps: country.googleMapsLink,
        internetTLD: country.internetTLD
      },
      geography: {
        continent: {
          name: country.continent.name,
          code: country.continent.code,
          emoji: country.continent.emoji
        },
        coordinates: {
          latitude: country.coordinates.latitude,
          longitude: country.coordinates.longitude
        },
        area: {
          sqKm: country.area.squareKilometers,
          sqMiles: country.area.squareMiles
        },
        landlocked: country.landlocked,
        neighbors: country.neighbors.map(neighbor => ({
          name: neighbor.name,
          flag: neighbor.flag,
          coordinates: {
            latitude: neighbor.coordinates.latitude,
            longitude: neighbor.coordinates.longitude
          }
        }))
      },
      culture: {
        languages: {
          native: country.languages.native,
          codes: country.languages.codes
        },
        famousFor: country.famousFor,
        drivingSide: country.drivingSide,
        alcoholPolicy: country.alcoholProhibition
      },
      government: {
        constitutionalForm: country.constitutionalForm,
        currency: country.currency
      },
      isoCodes: {
        numeric: country.isoCode.numeric,
        alpha2: country.isoCode.alpha2,
        alpha3: country.isoCode.alpha3
      }
    };
    
  } catch (error) {
    throw new Error(`Failed to get country info: ${error.message}`);
  }
};

module.exports = { getCountryInfo };
