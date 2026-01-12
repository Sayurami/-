// xvideosService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchXvideos = async (query) => {
  const apiUrl = `https://apis.davidcyriltech.my.id/search/xvideo?text=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Xvideos API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.result)) {
      throw new Error("Invalid Xvideos API response structure");
    }

    return data.result.map(video => ({
      title: video.title,
      duration: video.duration,
      quality: video.quality,
      thumbnail: video.thumbnail,
      url: video.url,
      // Extract video ID from URL if needed
      videoId: video.url.split('/').pop().split('.')[0]
    }));
    
  } catch (error) {
    throw new Error(`Failed to search Xvideos: ${error.message}`);
  }
};

module.exports = { searchXvideos };
