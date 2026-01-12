// tiktokStalkService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const stalkTikTokUser = async (username) => {
  // Remove @ symbol if present
  const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
  const apiUrl = `https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(cleanUsername)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`TikTok Stalk API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.status || !data.data) {
      throw new Error("Invalid TikTok Stalk API response structure");
    }

    return {
      profile: {
        id: data.data.user.id,
        username: data.data.user.uniqueId,
        nickname: data.data.user.nickname,
        bio: data.data.user.signature,
        avatars: {
          large: data.data.user.avatarLarger,
          medium: data.data.user.avatarMedium,
          thumb: data.data.user.avatarThumb
        },
        verified: data.data.user.verified,
        private: data.data.user.privateAccount,
        createdAt: new Date(data.data.user.createTime * 1000).toISOString(),
        region: data.data.user.region,
        language: data.data.user.language,
        secUid: data.data.user.secUid
      },
      stats: {
        followers: data.data.stats.followerCount,
        following: data.data.stats.followingCount,
        likes: data.data.stats.heartCount,
        videos: data.data.stats.videoCount,
        friends: data.data.stats.friendCount
      },
      settings: {
        comment: data.data.user.commentSetting,
        duet: data.data.user.duetSetting,
        stitch: data.data.user.stitchSetting,
        download: data.data.user.downloadSetting
      },
      items: data.data.itemList || []
    };
    
  } catch (error) {
    throw new Error(`Failed to stalk TikTok user: ${error.message}`);
  }
};

module.exports = { stalkTikTokUser };
