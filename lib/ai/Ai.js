// aiService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Llama service
const getLlamaResponse = async (text) => {
  const apis = [
    `https://vapis.my.id/api/Ilamav2?q=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/meta-llama-33-70B-instruct-turbo?content=${encodeURIComponent(text)}`,
    `https://apis.davidcyriltech.my.id/ai/llama3?text=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/llama2-70b-chat?content=${encodeURIComponent(text)}`
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      if (data.message || data.data || data.response) {
        return data.message || data.data || data.response;
      }
    } catch (error) { continue; }
  }
  throw new Error("All Llama APIs failed to respond.");
};

// DeepSeek service
const getDeepSeekResponse = async (text) => {
  const apis = [
    `https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(text)}`,
    `https://apis.davidcyriltech.my.id/ai/deepseek-v3?text=${encodeURIComponent(text)}`,
    `https://apis.davidcyriltech.my.id/ai/deepseek-r1?text=${encodeURIComponent(text)}`,
    `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(text)}`
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      if (data.message || data.data || data.answer) {
        return data.message || data.data || data.answer;
      }
    } catch (error) { continue; }
  }
  throw new Error("All DeepSeek APIs failed to respond.");
};

// Bard service
const getBardResponse = async (text) => {
  const apis = [
    `https://dark.guruapi.tech/egpt?prompt=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/bard?query=${encodeURIComponent(text)}`
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      if (data.message || data.data) {
        return data.message || data.data;
      }
    } catch (error) { continue; }
  }
  throw new Error("All Bard APIs failed to respond.");
};

// Blackbox service
const getBlackboxResponse = async (text) => {
  const apis = [
    `https://dark.guruapi.tech/egpt?prompt=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/blackboxai-pro?content=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/blackboxai?content=${encodeURIComponent(text)}`,
    `https://vapis.my.id/api/blackbox?q=${encodeURIComponent(text)}`,
    `https://apis.davidcyriltech.my.id/blackbox?q=${encodeURIComponent(text)}`
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      if (data.message || data.data || data.result || data.response) {
        return data.message || data.data || data.result || data.response;
      }
    } catch (error) { continue; }
  }
  throw new Error("All Blackbox APIs failed to respond.");
};

// MetaAI service
const getMetaAIResponse = async (text) => {
  const apis = [
    `https://dark.guruapi.tech/egpt?prompt=${encodeURIComponent(text)}`,
    `https://apis.davidcyriltech.my.id/ai/metaai?text=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/metaai?query=${encodeURIComponent(text)}`
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      if (data.message || data.data) {
        return data.message || data.data;
      }
    } catch (error) { continue; }
  }
  throw new Error("All MetaAI APIs failed to respond.");
};

// Gemini service
const getGeminiResponse = async (text) => {
  const apis = [
    `https://vapis.my.id/api/gemini?q=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(text)}`,
    `https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(text)}`,
    `https://api.dreaded.site/api/gemini2?text=${encodeURIComponent(text)}`,
    `https://api.giftedtech.my.id/api/ai/geminiai?apikey=gifted&q=${encodeURIComponent(text)}`,
    `https://api.giftedtech.my.id/api/ai/geminiaipro?apikey=gifted&q=${encodeURIComponent(text)}`
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      if (data.message || data.data || data.answer || data.result) {
        return data.message || data.data || data.answer || data.result;
      }
    } catch (error) { continue; }
  }
  throw new Error("All Gemini APIs failed to respond.");
};

module.exports = { 
  getLlamaResponse,
  getDeepSeekResponse,
  getBardResponse,
  getBlackboxResponse,
  getMetaAIResponse,
  getGeminiResponse
};
