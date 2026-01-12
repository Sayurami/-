// instagramUserService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchInstagramUsers = async (query) => {
  const apiUrl = `https://apis-starlights-team.koyeb.app/starlight/Instagram-users?text=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Instagram Users API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.data)) {
      throw new Error("Invalid Instagram Users API response structure");
    }

    return data.data.map(user => ({
      username: user.username,
      fullName: user.full_name,
      isPrivate: user.is_private,
      profilePic: user.profile,
      isVerified: user.verified,
      profileUrl: user.url
    }));
    
  } catch (error) {
    throw new Error(`Failed to search Instagram users: ${error.message}`);
  }
};

module.exports = { searchInstagramUsers };
