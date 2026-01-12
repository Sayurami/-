const axios = require('axios');

/**
 * Instagram Downloader Function
 * @param {string} url - Instagram post URL
 * @returns {Promise<Object>} - Object containing media type and download URL
 * @throws {Error} If the API request fails or returns invalid data
 */
async function instagramdl(url) {
    const apiUrl = 'https://apis.davidcyriltech.my.id/instagram';
    
    try {
        const response = await axios.get(apiUrl, {
            params: { url },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        const data = response.data;

        if (!data.downloadUrl) {
            throw new Error('No download URL found in API response');
        }

        return {
            type: data.type,
            downloadUrl: data.downloadUrl
        };
        
    } catch (error) {
        console.error('Instagram download failed:', error.message);
        throw error;
    }
}

module.exports = { instagramdl };
