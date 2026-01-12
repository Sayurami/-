// fluxAIService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const dalle3 = async (prompt) => {
  const apiUrl = `https://zaikyoov3-up.up.railway.app/api/dalle3?prompt=${encodeURIComponent(prompt)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Assuming the API returns either JSON or binary image data
    const contentType = response.headers.get('content-type');
    
    if (contentType.includes('application/json')) {
      const data = await response.json();
      // Handle JSON response (if API returns metadata first)
      if (data.imageUrl) {
        return downloadImage(data.imageUrl);
      }
      throw new Error("Unexpected JSON response structure");
    } else if (contentType.includes('image/')) {
      // Direct image response
      const imageBuffer = await response.buffer();
      return {
        image: imageBuffer,
        mimeType: contentType
      };
    } else {
      throw new Error("Unsupported response type");
    }
  } catch (error) {
    throw new Error(`Failed to generate AI image: ${error.message}`);
  }
};

const downloadImage = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Image download failed: ${response.status}`);
    
    return {
      image: await response.buffer(),
      mimeType: response.headers.get('content-type')
    };
  } catch (error) {
    throw new Error(`Image download failed: ${error.message}`);
  }
};

module.exports = { dalle3 };
