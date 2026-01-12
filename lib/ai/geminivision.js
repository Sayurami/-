// geminiVisionService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const analyzeImageWithGemini = async (imageUrl, instruction = 'Describe this image') => {
  if (!imageUrl) {
    throw new Error('Image URL is required');
  }

  const apiUrl = `https://api.dreaded.site/api/gemini-vision?url=${encodeURIComponent(imageUrl)}&instruction=${encodeURIComponent(instruction)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Gemini Vision API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.result) {
      throw new Error("Invalid Gemini Vision API response structure");
    }

    return {
      analysis: data.result.trim(),
      metadata: {
        imageUrl,
        instruction,
        apiVersion: 'gemini-vision',
        timestamp: new Date().toISOString()
      }
    };
    
  } catch (error) {
    throw new Error(`Failed to analyze image with Gemini: ${error.message}`);
  }
};

module.exports = { analyzeImageWithGemini };
