// youtubeStalkService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const stalkYouTubeChannel = async (username) => {
  // Remove @ symbol if present
  const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
  const apiUrl = `https://api.siputzx.my.id/api/stalk/youtube?username=${encodeURIComponent(cleanUsername)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`YouTube Stalk API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.status || !data.data?.channel) {
      throw new Error("Invalid YouTube Stalk API response structure");
    }

    const channel = data.data.channel;
    const videos = data.data.latest_videos || [];

    return {
      channel: {
        username: channel.username,
        url: channel.channelUrl,
        description: channel.description,
        avatar: channel.avatarUrl,
        stats: {
          subscribers: parseInt(channel.subscriberCount) || 0,
          videos: parseInt(channel.videoCount) || 0
        }
      },
      videos: videos.map(video => ({
        id: video.videoId,
        title: video.title,
        url: video.videoUrl,
        thumbnail: video.thumbnail,
        duration: video.duration,
        views: parseInt(video.viewCount.replace(/,/g, '')) || 0,
        published: video.publishedTime,
        isShort: video.title.toLowerCase().includes('#shorts')
      }))
    };
    
  } catch (error) {
    throw new Error(`Failed to stalk YouTube channel: ${error.message}`);
  }
};

module.exports = { stalkYouTubeChannel };
