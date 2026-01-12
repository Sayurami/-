// twitterStalkService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const stalkTwitterUser = async (username) => {
  // Remove @ symbol if present
  const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
  const apiUrl = `https://api.siputzx.my.id/api/stalk/twitter?user=${encodeURIComponent(cleanUsername)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Twitter Stalk API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.status || !data.data) {
      throw new Error("Invalid Twitter Stalk API response structure");
    }

    const user = data.data;
    const createdAt = new Date(user.created_at).toISOString();

    return {
      profile: {
        id: user.id,
        username: user.username,
        displayName: user.name,
        description: user.description,
        location: user.location,
        verified: user.verified,
        verifiedType: user.verified_type,
        createdAt: createdAt,
        images: {
          avatar: user.profile.image,
          banner: user.profile.banner
        }
      },
      stats: {
        tweets: user.stats.tweets,
        following: user.stats.following,
        followers: user.stats.followers,
        likes: user.stats.likes,
        media: user.stats.media
      }
    };
    
  } catch (error) {
    throw new Error(`Failed to stalk Twitter user: ${error.message}`);
  }
};

module.exports = { stalkTwitterUser };
