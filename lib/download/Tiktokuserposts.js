// tiktokUserPostsService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getUserPosts = async (username) => {
  // Remove @ symbol if present
  const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
  const apiUrl = `https://apis-starlights-team.koyeb.app/starlight/tiktok-user-posts?user=${encodeURIComponent(cleanUsername)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`TikTok User Posts API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 200 || !Array.isArray(data.data?.videos)) {
      throw new Error("Invalid TikTok User Posts API response structure");
    }

    return data.data.videos.map(video => ({
      id: video.video_id,
      title: video.title,
      region: video.region,
      cover: video.cover,
      duration: video.duration,
      stats: {
        plays: video.play_count,
        likes: video.digg_count,
        comments: video.comment_count,
        shares: video.share_count,
        downloads: video.download_count
      },
      created: video.create_time,
      author: {
        id: video.author.id,
        username: video.author.unique_id,
        nickname: video.author.nickname,
        avatar: video.author.avatar
      },
      media: {
        video: video.play,
        videoWithWatermark: video.wmplay,
        music: video.music,
        musicInfo: video.music_info ? {
          title: video.music_info.title,
          artist: video.music_info.author,
          duration: video.music_info.duration,
          isOriginal: video.music_info.original,
          url: video.music_info.play
        } : null,
        images: video.images || []
      },
      isAd: video.is_ad,
      commerceInfo: video.commerce_info
    }));
    
  } catch (error) {
    throw new Error(`Failed to fetch TikTok user posts: ${error.message}`);
  }
};

module.exports = { getUserPosts };
