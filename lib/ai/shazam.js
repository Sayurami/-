/*const acrcloud = require("acrcloud");

const acr = new acrcloud({
  host: "us-west-2.api.acrcloud.com",
  access_key: "26afd4eec96b0f5e5ab16a7e6e05ab37",
  access_secret: "wXOZIqdMNZmaHJP1YDWVyeQLg579uK2CfY6hWMN8"
});

const recognizeAudio = async (audioUrl) => {
  if (!audioUrl) {
    throw new Error('Audio URL is required');
  }

  try {
    // Fetch the audio file
    const response = await fetch(audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    // Get audio data as buffer
    const audioBuffer = await response.arrayBuffer();
    
    // Recognize the audio
    const result = await acr.identify(audioBuffer);
    
    if (result.status.code !== 0) {
      throw new Error(result.status.msg || 'Audio recognition failed');
    }

    // Extract relevant metadata
    const metadata = result.metadata || {};
    const music = metadata.music && metadata.music[0];
    
    if (!music) {
      return {
        status: false,
        message: 'No music recognized in the audio',
        metadata: {
          audioUrl,
          timestamp: new Date().toISOString()
        }
      };
    }

    return {
      status: true,
      title: music.title,
      artist: music.artists && music.artists.map(a => a.name).join(', '),
      album: music.album && music.album.name,
      releaseDate: music.release_date,
      duration: music.duration_ms,
      genres: music.genres && music.genres.map(g => g.name).join(', '),
      externalIds: music.external_ids,
      metadata: {
        audioUrl,
        timestamp: new Date().toISOString(),
        recognitionService: "ACRCloud"
      }
    };
    
  } catch (error) {
    throw new Error(`Audio recognition failed: ${error.message}`);
  }
};

module.exports = { recognizeAudio };
const acrcloud = require("acrcloud");
const fetch = require('node-fetch'); // Make sure to install node-fetch
const { Readable } = require('stream');

const acr = new acrcloud({
  host: "us-west-2.api.acrcloud.com",
  access_key: "26afd4eec96b0f5e5ab16a7e6e05ab37",
  access_secret: "wXOZIqdMNZmaHJP1YDWVyeQLg579uK2CfY6hWMN8"
});

const recognizeAudio = async (audioUrl) => {
  if (!audioUrl) {
    throw new Error('Audio URL is required');
  }

  try {
    // Fetch the audio file
    const response = await fetch(audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    // Convert the response to a buffer
    const audioBuffer = await response.buffer();
    
    // Convert buffer to stream as ACRCloud expects a stream
    const audioStream = new Readable();
    audioStream.push(audioBuffer);
    audioStream.push(null); // Signals end of stream
    
    // Recognize the audio
    const result = await new Promise((resolve, reject) => {
      acr.identify(audioStream, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
    
    if (result.status.code !== 0) {
      throw new Error(result.status.msg || 'Audio recognition failed');
    }

    // Extract relevant metadata
    const metadata = result.metadata || {};
    const music = metadata.music && metadata.music[0];
    
    if (!music) {
      return {
        status: false,
        message: 'No music recognized in the audio',
        metadata: {
          audioUrl,
          timestamp: new Date().toISOString()
        }
      };
    }

    return {
      status: true,
      title: music.title,
      artist: music.artists && music.artists.map(a => a.name).join(', '),
      album: music.album && music.album.name,
      releaseDate: music.release_date,
      duration: music.duration_ms,
      genres: music.genres && music.genres.map(g => g.name).join(', '),
      externalIds: music.external_ids,
      metadata: {
        audioUrl,
        timestamp: new Date().toISOString(),
        recognitionService: "ACRCloud"
      }
    };
    
  } catch (error) {
    console.error('Recognition error:', error);
    throw new Error(`Audio recognition failed: ${error.message}`);
  }
};

module.exports = { recognizeAudio };*/

const acrcloud = require("acrcloud");
const { Readable } = require('stream');

// Dynamic import for node-fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const acr = new acrcloud({
  host: "us-west-2.api.acrcloud.com",
  access_key: "26afd4eec96b0f5e5ab16a7e6e05ab37",
  access_secret: "wXOZIqdMNZmaHJP1YDWVyeQLg579uK2CfY6hWMN8"
});

const recognizeAudio = async (audioUrl) => {
  if (!audioUrl) {
    throw new Error('Audio URL is required');
  }

  try {
    // Fetch the audio file
    const response = await fetch(audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    // Get the audio data as ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();
    
    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(arrayBuffer);
    
    // Create a readable stream from the buffer
    const audioStream = new Readable();
    audioStream.push(buffer);
    audioStream.push(null); // Signals end of stream
    
    // Recognize the audio using callback style
    const result = await new Promise((resolve, reject) => {
      acr.identify(audioStream, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
    
    if (result.status.code !== 0) {
      throw new Error(result.status.msg || 'Audio recognition failed');
    }

    // Extract relevant metadata
    const metadata = result.metadata || {};
    const music = metadata.music && metadata.music[0];
    
    if (!music) {
      return {
        status: false,
        message: 'No music recognized in the audio',
        metadata: {
          audioUrl,
          timestamp: new Date().toISOString()
        }
      };
    }

    return {
      status: true,
      title: music.title,
      artist: music.artists && music.artists.map(a => a.name).join(', '),
      album: music.album && music.album.name,
      releaseDate: music.release_date,
      duration: music.duration_ms,
      genres: music.genres && music.genres.map(g => g.name).join(', '),
      externalIds: music.external_ids,
      metadata: {
        audioUrl,
        timestamp: new Date().toISOString(),
        recognitionService: "ACRCloud"
      }
    };
    
  } catch (error) {
    console.error('Recognition error:', error);
    throw new Error(`Audio recognition failed: ${error.message}`);
  }
};

module.exports = { recognizeAudio };
