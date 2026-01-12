// spotifyService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getSpotifyTrack = async (title) => {
  const apiUrl = `https://api.dreaded.site/api/spotifydl?title=${encodeURIComponent(title)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.result) {
      return {
        title: data.result.title,
        downloadLink: data.result.downloadLink
      };
    } else {
      throw new Error("Invalid API response structure");
    }
  } catch (error) {
    throw new Error(`Failed to fetch Spotify track: ${error.message}`);
  }
};

module.exports = { getSpotifyTrack };
