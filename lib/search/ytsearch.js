// youtubeService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchYouTube = async (query) => {
  const apiUrl = `https://apis.davidcyriltech.my.id/youtube/search?query=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`YouTube API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.status || !Array.isArray(data.results)) {
      throw new Error("Invalid YouTube API response structure");
    }

    return data.results.map(video => ({
      title: video.title,
      id: video.videoId,
      url: video.url,
      thumbnail: video.thumbnail,
      views: video.views,
      duration: video.duration,
      published: video.published
    }));
    
  } catch (error) {
    throw new Error(`Failed to search YouTube: ${error.message}`);
  }
};

module.exports = { searchYouTube };
