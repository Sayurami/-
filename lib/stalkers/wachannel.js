const axios = require("axios");

async function wachannel(link) {
  const url = `https://itzpire.com/stalk/whatsapp-channel?url=${link}`;

  try {
    // Send request to the API
    const response = await axios.get(url);

    // Destructure necessary data from the API response
    const { status, code, data } = response.data;

    // Validate response status and code
    if (status === "success" && code === 200) {
      const { img, title, followers, description } = data;

      // Return the channel details
      return {
        img,
        title,
        followers,
        description,
      };
    } else {
      throw new Error("API returned an unsuccessful response.");
    }
  } catch (error) {
    // Handle and log errors
    console.error("Error fetching WhatsApp channel details:", error.message);
    return null; // Return null in case of failure
  }
}

module.exports = { wachannel };

