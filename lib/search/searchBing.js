// bingService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchBing = async (query) => {
  const apiUrl = `https://vapis.my.id/api/bingsrc?q=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Bing API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.status && Array.isArray(data.data)) {
      return data.data.map(result => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet,
        image: result.image
      }));
    } else {
      throw new Error("Invalid Bing API response structure");
    }
  } catch (error) {
    throw new Error(`Failed to perform Bing search: ${error.message}`);
  }
};

module.exports = { searchBing };
