const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cheerio = require('cheerio');

const searchLyrics = async (query) => {
  try {
    // Fetch lyrics from Google search via Jina.ai proxy
    const response = await fetch(
      `https://r.jina.ai/https://www.google.com/search?q=lyrics+${encodeURIComponent(query)}&hl=en`,
      {
        headers: {
          'x-return-format': 'html',
          'x-engine': 'cf-browser-rendering',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Lyrics search failed with status ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract lyrics sections
    const lyricsSections = [];
    $('div[jsname="U8S5sf"]').each((i, el) => {
      let section = '';
      $(el).find('span[jsname="YS01Ge"]').each((j, span) => {
        section += $(span).text() + '\n';
      });
      lyricsSections.push(section.trim());
    });

    // Extract metadata
    const metadata = {};
    const output = [];
    
    $('div.PZPZlf').each((i, e) => {
      const finder = $(e).find('div[jsname="U8S5sf"]').text().trim();
      if (!finder) output.push($(e).text().trim());
    });

    // Process metadata
    if (output.length > 0) {
      metadata.title = output.shift();
      metadata.subtitle = output.shift();
      
      output.forEach(item => {
        if (item.includes(':')) {
          const [name, value] = item.split(':');
          metadata[name.toLowerCase().trim()] = value.trim();
        }
      });
    }

    // Combine into the expected format
    const fullLyrics = lyricsSections.join('\n\n');
    
    if (!fullLyrics || fullLyrics.trim().length === 0) {
      return []; // Return empty array to match original behavior when no lyrics found
    }

    // Parse artist and song from title if available
    let artist = '';
    let song = query;
    if (metadata.title) {
      const titleParts = metadata.title.split(' by ');
      if (titleParts.length > 1) {
        song = titleParts[0].trim();
        artist = titleParts[1].trim();
      } else if (metadata.subtitle) {
        artist = metadata.subtitle.trim();
      }
    }

    // Return in the original format
    return [{
      song: song,
      artist: artist,
      album: metadata.album || '',
      duration: metadata.duration || '',
      lyrics: fullLyrics
    }];

  } catch (error) {
    throw new Error(`Failed to fetch lyrics: ${error.message}`);
  }
};

module.exports = { searchLyrics };
// lyricsService.js
/*const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchLyrics = async (query) => {
  const apiUrl = `https://xploader-apis-5f424ea8f0da.herokuapp.com/lyrics?query=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Lyrics API request failed with status ${response.status}`);
    }

    const results = await response.json();

    if (!Array.isArray(results)) {
      throw new Error("Invalid API response format - expected array");
    }

    // Map to clean format and filter empty lyrics
    return results
      .filter(track => track.lyrics && track.lyrics.trim().length > 0)
      .map(track => ({
        song: track.song,
        artist: track.artist,
        album: track.album,
        duration: track.duration,
        lyrics: track.lyrics
      }));
      
  } catch (error) {
    throw new Error(`Failed to fetch lyrics: ${error.message}`);
  }
};

module.exports = { searchLyrics };
const cheerio = require('cheerio');

async function searchLyrics(songTitle) {
    try {
        const response = await fetch(`https://r.jina.ai/https://www.google.com/search?q=lyrics+${encodeURIComponent(songTitle)}&hl=en`, {
            headers: {
                'x-return-format': 'html',
                'x-engine': 'cf-browser-rendering',
            }
        });

        const text = await response.text();
        const $ = cheerio.load(text);
        const lyrics = [];
        const output = [];
        const result = {};

        $('div.PZPZlf').each((i, e) => {
            const finder = $(e).find('div[jsname="U8S5sf"]').text().trim();
            if (!finder) output.push($(e).text().trim());
        });

        $('div[jsname="U8S5sf"]').each((i, el) => {
            let out = '';
            $(el).find('span[jsname="YS01Ge"]').each((j, span) => {
                out += $(span).text() + '\n';
            });
            lyrics.push(out.trim());
        });

        result.lyrics = lyrics.join('\n\n');
        result.title = output.shift();
        result.subtitle = output.shift();
        result.platform = output.filter(_ => !_.includes(':'));

        output.forEach(_ => {
            if (_.includes(':')) {
                const [name, value] = _.split(':');
                result[name.toLowerCase()] = value.trim();
            }
        });

        return result;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = searchLyrics*/
