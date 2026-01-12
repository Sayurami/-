// soundcloudDownloadService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const sdl = async (trackUrl) => {
  const apiUrl = `https://api.siputzx.my.id/api/d/soundcloud?url=${encodeURIComponent(trackUrl)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`SoundCloud API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.status || !data.data) {
      throw new Error("Invalid SoundCloud API response structure");
    }

    const trackInfo = data.data;
    
    return {
      metadata: {
        source: 'SoundCloud',
        retrievedAt: new Date().toISOString()
      },
      track: {
        title: trackInfo.title,
        thumbnail: trackInfo.thumbnail,
        downloadUrl: trackInfo.url,
        audioInfo: {
          format: trackInfo.url.match(/\.(\w{3,4})(?=\?|$)/)?.[1] || 'unknown',
          // Extract additional info from the URL if available
          bitrate: trackInfo.url.includes('.128.mp3') ? 128 : 
                 trackInfo.url.includes('.256.mp3') ? 256 : 
                 trackInfo.url.includes('.320.mp3') ? 320 : null
        }
      }
    };
    
  } catch (error) {
    return {
      metadata: {
        success: false,
        error: error.message,
        retrievedAt: new Date().toISOString()
      },
      track: null
    };
  }
};

module.exports = { sdl };
