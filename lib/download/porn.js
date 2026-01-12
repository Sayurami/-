// videoDownloadService.js
// adultVideoService.js

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getVideoDownload = async (videoUrl) => {
  if (!videoUrl || typeof videoUrl !== 'string') {
    throw new Error('Invalid video URL provided');
  }

  const apiUrl = `https://api-aswin-sparky.koyeb.app/api/downloader/xnxx?url=${encodeURIComponent(videoUrl)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Adult Video API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data?.status || !data?.data) {
      throw new Error("Invalid Adult Video API response structure");
    }

    // Ensure all required fields exist with fallbacks
    const result = {
      meta: {
        source: videoUrl.includes('xvideos') ? 'xvideos' : 
               videoUrl.includes('xnxx') ? 'xnxx' : 
               'unknown'
      },
      videoInfo: {
        title: data.data?.title || 'No title available',
        url: data.data?.URL || videoUrl, // Fallback to original URL if not provided
        duration: parseInt(data.data?.duration) || 0,
        thumbnail: data.data?.image || '',
        description: data.data?.info || ''
      },
      downloads: {
        lowQuality: data.data?.files?.low || '',
        highQuality: data.data?.files?.high || '',
        hlsStream: data.data?.files?.HLS || '',
        thumbnails: {
          small: data.data?.files?.thumb || '',
          medium: data.data?.files?.thumb69 || '',
          slide: data.data?.files?.thumbSlide || '',
          large: data.data?.files?.thumbSlideBig || ''
        }
      }
    };

    return result;
    
  } catch (error) {
    throw new Error(`Failed to get adult video info: ${error.message}`);
  }
};

module.exports = { getVideoDownload };
/*const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getVideoDownload = async (videoUrl) => {
  const apiUrl = `https://apis.davidcyriltech.my.id/xvideo?url=${encodeURIComponent(videoUrl)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Video Download API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !data.download_url) {
      throw new Error("Invalid video download API response");
    }

    return {
      title: data.title,
      thumbnail: data.thumbnail,
      downloadUrl: data.download_url
    };
  } catch (error) {
    throw new Error(`Failed to get video download: ${error.message}`);
  }
};

module.exports = { getVideoDownload };*/
