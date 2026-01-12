// spotifySearchService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchSpotifyTracks = async (query, limit = 20) => {
  const apiUrl = `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(query)}&limit=${limit}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Spotify Search API request failed with status ${response.status}`);
    }

    const tracks = await response.json();

    if (!Array.isArray(tracks)) {
      throw new Error("Invalid Spotify Search API response - expected array");
    }

    return tracks.map(track => ({
      id: track.id,
      title: track.title,
      artist: track.artist,
      album: track.album,
      url: track.url,
      thumbnail: track.thumbnail,
      duration: {
        formatted: track.duration,
        milliseconds: track.durationMs
      },
      releaseDate: track.release_date,
      preview: track.preview_mp3,
      type: 'track' // Helps identify type in mixed results
    }));
    
  } catch (error) {
    throw new Error(`Failed to search Spotify tracks: ${error.message}`);
  }
};

module.exports = { searchSpotifyTracks };
