// twitterSearchService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchTweets = async (query) => {
  const apiUrl = `https://apis-starlights-team.koyeb.app/starlight/tweets-search?text=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Twitter Search API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.data)) {
      throw new Error("Invalid Twitter Search API response structure");
    }

    return data.data.map(tweet => ({
      id: tweet.user_id,
      username: tweet.screen_name,
      displayName: tweet.user_name,
      verified: tweet.verified,
      description: tweet.user_desc,
      profileImage: tweet.profile,
      bannerImage: tweet.banner,
      stats: {
        followers: tweet.followers,
        following: tweet.following,
        views: tweet.views,
        likes: tweet.likes,
        retweets: tweet.shares,
        replies: tweet.comments
      },
      content: {
        text: tweet.caption,
        url: tweet.url,
        mediaType: tweet.url.includes('/photo/') ? 'image' : 
                 tweet.url.includes('/video/') ? 'video' : 'text'
      },
      createdAt: new Date(tweet.created_at).toISOString() // If available in response
    }));
    
  } catch (error) {
    throw new Error(`Failed to search tweets: ${error.message}`);
  }
};

module.exports = { searchTweets };
