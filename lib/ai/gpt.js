// aiService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getAIResponse = async (text) => {
  const apis = [
    `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(text)}`,
    `https://vapis.my.id/api/Ilamav2?q=${encodeURIComponent(text)}`,
    `https://bk9.fun/ai/llama?q=${encodeURIComponent(text)}`,
    `https://bk9.fun/ai/chataibot?q=${encodeURIComponent(text)}`
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api);
      const data = await response.json();

      // Check if the API response is successful
      if (data.result || data.BK9) {
        return data.result || data.BK9;
      }
    } catch (error) {
      // If the API fails, continue to the next one
      continue;
    }
  }

  throw new Error("All APIs failed to respond.");
};

module.exports = { getAIResponse };
