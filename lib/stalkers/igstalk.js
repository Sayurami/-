// instaStalkService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const stalkInstagramUser = async (username) => {
  // Remove @ symbol if present
  const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
  const apiUrl = `https://ccprojectapis.ddns.net/api/insta/stalk?ig=${encodeURIComponent(cleanUsername)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Instagram Stalk API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0 || !data[0].username) {
      throw new Error("Invalid Instagram Stalk API response structure");
    }

    const userData = data[0];

    return {
      profile: {
        id: userData.pk,
        username: userData.username,
        fullName: userData.full_name,
        isPrivate: userData.is_private,
        isVerified: userData.is_verified,
        isBusiness: userData.is_business,
        avatars: {
          standard: userData.profile_pic_url,
          hd: userData.profile_pic_url_hd
        },
        biography: userData.biography,
        externalUrl: userData.external_url,
        category: userData.category,
        accountType: userData.account_type,
        createdAt: userData.fbid ? parseInt(userData.fbid.split(':')[0]) : null,
        pronouns: userData.pronouns,
        bioLinks: userData.bio_links || []
      },
      stats: {
        followers: userData.follower_count,
        following: userData.following_count,
        mediaCount: userData.media_count,
        clipsCount: userData.total_clips_count
      },
      status: {
        isMemorialized: userData.is_memorialized,
        isEmbedsDisabled: userData.is_embeds_disabled,
        isUnpublished: userData.is_unpublished
      },
      accountBadges: userData.account_badges || []
    };
    
  } catch (error) {
    throw new Error(`Failed to stalk Instagram user: ${error.message}`);
  }
};

module.exports = { stalkInstagramUser };
