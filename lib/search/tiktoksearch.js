// tiktokService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchTikTok = async (query) => {
  const apiUrl = `https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`TikTok API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 200 || !Array.isArray(data.data)) {
      throw new Error("Invalid TikTok API response structure");
    }

    return data.data.map(video => ({
      id: video.video_id,
      url: video.url,
      author: video.author,
      title: video.title,
      cover: video.cover,
      duration: video.duration,
      views: video.views,
      likes: video.likes,
      comments: video.comments,
      shares: video.share,
      created: video.create_time,
      downloadCount: video.download,
      videoUrls: {
        noWatermark: video.nowm,
        withWatermark: video.wm,
        music: video.music
      }
    }));
    
  } catch (error) {
    throw new Error(`Failed to search TikTok: ${error.message}`);
  }
};

module.exports = { searchTikTok };
