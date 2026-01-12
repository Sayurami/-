/*const ytSearch = require("yt-search");
const axios = require("axios");

// Function to validate YouTube URLs
const isValidYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/;
  return youtubeRegex.test(url);
};

// Function to perform YouTube search
const yts = async (query) => {
  const search = await ytSearch(query);
  if (!search.all.length) throw new Error("No results found.");
  return search.all[0];
};

// Function to download MP3 using the new API
const dlmp3 = async (link) => {
  if (!isValidYouTubeUrl(link)) {
    throw new Error("Invalid YouTube URL provided.");
  }

  const encodedUrl = encodeURIComponent(link);
  const api = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodedUrl}`;

  try {
    const response = await axios.get(api);
    const data = response.data;

    if (data.status === 200 || data.success) {
      return {
        downloadUrl: data.result.download_url,
        title: data.result.title,
        format: data.result.type,
        quality: data.result.quality,
      };
    }
  } catch (error) {
    throw new Error("Unable to fetch MP3 download link.");
  }

  throw new Error("API request failed.");
};

// Function to download MP4
const dlmp4 = async (link) => {
  if (!isValidYouTubeUrl(link)) {
    throw new Error("Invalid YouTube URL provided.");
  }

  const encodedUrl = encodeURIComponent(link);
  const api = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodedUrl}`;

  try {
    const response = await axios.get(api);
    const data = response.data;

    if (data.status === 200 || data.success) {
      return {
        downloadUrl: data.result.download_url,
        title: data.result.title,
        format: data.result.format,
        quality: data.result.quality,
      };
    }
  } catch (error) {
    throw new Error("Unable to fetch MP4 download link.");
  }

  throw new Error("API request failed.");
};

module.exports = { yts, dlmp3, dlmp4 };*/

const ytSearch = require("yt-search");
const axios = require("axios");

// Function to validate YouTube URLs
const isValidYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/;
  return youtubeRegex.test(url);
};

// Function to perform YouTube search
const yts = async (query) => {
  const search = await ytSearch(query);
  if (!search.all.length) throw new Error("No results found.");
  return search.all[0];
};

// Function to download MP3 using the new API
const dlmp3 = async (link) => {
  if (!isValidYouTubeUrl(link)) {
    throw new Error("Invalid YouTube URL provided.");
  }

  const encodedUrl = encodeURIComponent(link);
  const api = `https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=${encodedUrl}`;

  try {
    const response = await axios.get(api);
    const data = response.data;

    if (data.status === 200 || data.success) {
      return {
        downloadUrl: data.result.download_url,
        title: data.result.title,
        format: data.result.type,
        quality: data.result.quality,
      };
    }
  } catch (error) {
    throw new Error("Unable to fetch MP3 download link.");
  }

  throw new Error("API request failed.");
};

// Function to download MP4
const dlmp4 = async (link) => {
  if (!isValidYouTubeUrl(link)) {
    throw new Error("Invalid YouTube URL provided.");
  }

  const encodedUrl = encodeURIComponent(link);
  const api = `https://api.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=${encodedUrl}`;

  try {
    const response = await axios.get(api);
    const data = response.data;

    if (data.status === 200 || data.success) {
      return {
        downloadUrl: data.result.download_url,
        title: data.result.title,
        format: data.result.format,
        quality: data.result.quality,
      };
    }
  } catch (error) {
    throw new Error("Unable to fetch MP4 download link.");
  }

  throw new Error("API request failed.");
};

module.exports = { yts, dlmp3, dlmp4 };
