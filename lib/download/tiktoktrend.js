// tiktokTrendsService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getTikTokTrends = async (region = 'US') => {
  const apiUrl = `https://apis-starlights-team.koyeb.app/starlight/tiktok-trends?region=${encodeURIComponent(region)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`TikTok Trends API request failed with status ${response.status}`);
    }

    const trends = await response.json();

    if (!Array.isArray(trends)) {
      throw new Error("Invalid TikTok Trends API response - expected array");
    }

    return trends.map(trend => ({
      id: trend.id,
      title: trend.title,
      region: trend.region,
      cover: trend.cover,
      duration: trend.duration,
      stats: {
        views: trend.repros,
        likes: trend.likes,
        comments: trend.comment,
        shares: trend.shares,
        downloads: trend.downloads
      },
      published: trend.publisehd,
      author: {
        id: trend.author.id,
        username: trend.author.unique_id,
        nickname: trend.author.nickname,
        avatar: trend.author.avatar
      },
      media: {
        noWatermark: trend.nowm,
        withWatermark: trend.wm,
        music: trend.music
      }
    }));
    
  } catch (error) {
    throw new Error(`Failed to fetch TikTok trends: ${error.message}`);
  }
};

module.exports = { getTikTokTrends };
