const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Gemini model
const genAI = new GoogleGenerativeAI("AIzaSyBhf-9L5NMR9wtNwL55hcXXwvPSOuVBzaw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const geminiVision2 = async (imageUrl, instruction = 'Describe this image') => {
  if (!imageUrl) {
    throw new Error('Image URL is required');
  }

  try {
    // Fetch the image data
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    // Get image data as base64
    const imageData = await response.arrayBuffer();
    const imageBase64 = Buffer.from(imageData).toString('base64');
    
    // Determine MIME type from response or default to 'image/jpeg'
    const mimeType = response.headers.get('content-type') || 'image/jpeg';
    
    // Create the prompt parts
    const promptParts = [
      { text: instruction },
      {
        inlineData: {
          mimeType,
          data: imageBase64
        }
      },
    ];

    // Run the model
    const result = await model.generateContent({
      contents: [{ role: "user", parts: promptParts }],
    });
    
    const responseText = await result.response.text();
    
    return {
      analysis: responseText.trim(),
      metadata: {
        imageUrl,
        instruction,
        model: "gemini-1.5-flash",
        timestamp: new Date().toISOString()
      }
    };
    
  } catch (error) {
    throw new Error(`Failed to analyze image with Gemini: ${error.message}`);
  }
};

module.exports = { geminiVision2 };
