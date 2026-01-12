const express = require("express");
const router = express.Router();
const fs = require("fs");
const axios = require("axios");

const Sinhalasub = require('./lib/movie/sinhalasub');
const sinhalasub = new Sinhalasub();
const Pirate = require('./lib/movie/pirate');
const pirate = new Pirate();
const Zoom = require('./lib/movie/zoom');
const zoom = new Zoom();
const { firemovie } = require("./lib/movie/firemovie");

const { logo } = require("./lib/more/logo");
const { random_mail, get_mails } = require("./lib/more/mail");
const { getStandings, getTopScorers, getMatches, getUpcomingMatches } = require("./lib/more/epl");
const { bl1Standings, bl1Matches, bl1TopScorers, bl1UpcomingMatches } = require("./lib/more/bundesliga");
const { ecStandings, ecMatches, ecTopScorers, ecUpcomingMatches } = require("./lib/more/euros");
const { wcStandings, wcMatches, wcTopScorers, wcUpcomingMatches } = require("./lib/more/fifa");
const { pdStandings, pdMatches, pdTopScorers, pdUpcomingMatches } = require("./lib/more/laliga");
const { fl1Standings, fl1Matches, fl1TopScorers, fl1UpcomingMatches } = require("./lib/more/ligue1");
const { saStandings, saMatches, saTopScorers, saUpcomingMatches } = require("./lib/more/seriea");
const { uclStandings, uclMatches, uclTopScorers, uclUpcomingMatches } = require("./lib/more/ucl");
const { tempnumber, tempnumbercode } = require("./lib/more/tempnumber");
const { ephoto360 } = require("./lib/more/ephoto360");
//ai images
const { recognizeAudio } = require("./lib/ai/shazam");
const { generateAIImage } = require("./lib/ai/bingai");
const { animaginexl } = require("./lib/ai/animaginexl");
const { animemix } = require("./lib/ai/animemix");
const { blazingdrive } = require("./lib/ai/blazingdrive");
const { braindance } = require("./lib/ai/braindance");
const { cogview } = require("./lib/ai/cogview");
const { cyberxl } = require("./lib/ai/cyberxl");
const { dalle2 } = require("./lib/ai/dalle2");
const { dalle3 } = require("./lib/ai/dalle3");
const { geminiVision2 } = require("./lib/ai/geminivision2");
const { analyzeImageWithGemini } = require("./lib/ai/geminivision");
const { dreamshaper } = require("./lib/ai/dreamshaper");
const { flux } = require("./lib/ai/flux");
const { fluxproultra } = require("./lib/ai/fluxproultra");
const { blackbox, blackbox4 } = require("./lib/ai/blackbox");
//const { generateAIImage } = require("./lib/ai/bingai");
const { getAIResponse } = require("./lib/ai/gpt");
const { getLlamaResponse, getDeepSeekResponse, getBardResponse, getBlackboxResponse, getMetaAIResponse, getGeminiResponse } = require("./lib/ai/Ai");
const { ytmp3, ytmp4 } = require("./lib/download/ytdl");
const { wachannel } = require("./lib/stalkers/wachannel");
const { stalkInstagramUser } = require("./lib/stalkers/igstalk");
const { stalkTikTokUser } = require("./lib/stalkers/tiktokstalk");
const { stalkTwitterUser } = require("./lib/stalkers/twitterstalk");
const { stalkYouTubeChannel } = require("./lib/stalkers/ytstalk");
const { getCountryInfo } = require("./lib/stalkers/countrystalk");
const { stalkIpAddress } = require("./lib/stalkers/ipstalk");
const { stalkNpmPackage } = require("./lib/stalkers/npmstalk");
//const { githubStalk } = require("./lib/stalkers/githubStalk");

const { stalkGitHubRepo } = require("./lib/stalkers/githubrepostalk");
const fetchHentaiVideos = require("./lib/download/hentaivid");
const { yts, dlmp3, dlmp4 } = require("./lib/download/play");
const { getTikTokTrends } = require("./lib/download/tiktoktrend");
const { getSpotifyTrack } = require("./lib/download/Spotify");
const { getUserPosts } = require("./lib/download/Tiktokuserposts");
const { pinterestimg } = require("./lib/download/piniimg");
const { twitter } = require("./lib/download/tw");
const { wallpaper } = require("./lib/download/wallpaper");
const { tiktokdl } = require("./lib/download/tiktok");
const { instagramdl } = require("./lib/download/igdl");
const { mfire } = require("./lib/download/mfire");
const { modwhatsappdl, modwadl } = require("./lib/download/modwhatsappdl");
const { fbdown } = require("./lib/download/fbdown");
const { getVideoDownload } = require("./lib/download/porn");
const { sdl } = require("./lib/download/soundcloud");
const { appletone, appletonedl } = require("./lib/download/appletone");

const { searchSpotifyTracks } = require("./lib/search/sposearch");
const { ssearch } = require("./lib/search/scloud");
const { searchXvideos } = require("./lib/search/xvideosearch");
const { searchTweets } = require("./lib/search/Searchtweets");
const { searchBing } = require("./lib/search/searchBing");
const { searchLyrics } = require("./lib/search/Lyrics");
const { searchInstagramUsers } = require("./lib/search/Instausers");
const { searchTikTok } = require("./lib/search/tiktoksearch");
const { searchYouTube } = require("./lib/search/ytsearch");
const { apks1, apkd1 } = require("./lib/search/apkfab");
const { getWeatherData } = require("./lib/search/weather");
const { stickersearch } = require("./lib/search/stic");
const { modwhatsapp } = require("./lib/search/modwhatsapp");
const { happymodSearch } = require("./lib/search/happymod");
const { wallpaperscraft } = require("./lib/search/wallpaper");
//const { spotify } = require("./lib/download/sdl");

const err_mg = 'Server is busy now. Try again later. Please report to the help center !!';
const notwork = 'This url type not working on this site !!';
const l = console.log;
const CREATOR = "Keithkeizzah";
const err_mg2 = "Internal Server Error.";

async function count() {
    return await axios.get("https://visitor.api.akuari.my.id/umum/view/tambah?id=darkyasiya");
}

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};

const runtime = (seconds) => {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
    var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
};
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});


// Image Generation Endpoint


// AI Routes
router.get("/ai/fluxproultra", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await fluxproultra(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/flux", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await flux(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/dreamshaper", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await dreamshaper(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/dalle", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await dalle3(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/dalle2", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await dalle2(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/cyberxl", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await cyberxl(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/cogview", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await cogview(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/braindance", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await braindance(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/blazingdrive", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await blazingdrive(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/animemix", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await animemix(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/animaginexl", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await animaginexl(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get("/ai/bing", async (req, res) => {
    try {
        // 1. Validate input
        const prompt = req.query.prompt || req.query.q;
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                status: false,
                creator: CREATOR,
                error: "Please provide a valid prompt parameter"
            });
        }

        // 2. Generate image
        const { image, mimeType } = await generateAIImage(prompt.trim());

        // 3. Send image response
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename="ai-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}"`,
            'X-Creator': CREATOR,
            'X-AI-Model': 'FluxAI'
        });
        
        res.send(image);

        // 4. Log success (optional)
        console.log(`[Success] Generated image for: ${prompt.substring(0, 30)}...`);

    } catch (error) {
        // 5. Error handling
        console.error(`[Error] ${error.message}`);
        
        res.status(500).json({
            status: false,
            creator: CREATOR,
            error: "Image generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
// Gemini Vision Route
router.get("/ai/gemini-vision2", (req, res) => {
    const imageUrl = req.query.url || req.query.image;
    const instruction = req.query.text || req.query.query || req.query.q || 'Describe this image';
    
    if (!imageUrl) {
        return res.status(400).json({ 
            status: false, 
            owner: CREATOR, 
            error: 'Image URL is required' 
        });
    }

    analyzeImageWithGemini(imageUrl, instruction)
        .then((data) => {
            res.json({ 
                status: true, 
                creator: CREATOR, 
                result: data.analysis,
                metadata: {
                    imageUrl: data.metadata.imageUrl,
                    instruction: data.metadata.instruction
                }
            });
            count(); // Your analytics function
        })
        .catch((err) => {
            console.error(err); // Log the actual error
            res.status(500).json({ 
                status: false, 
                creator: CREATOR, 
                error: err.message || 'Failed to analyze image' 
            });
        });
});
router.get("/ai/gemini-vision", (req, res) => {
    const imageUrl = req.query.url || req.query.image;
    const instruction = req.query.text || req.query.query || req.query.q || 'Describe this image';
    
    if (!imageUrl) {
        return res.status(400).json({ 
            status: false, 
            owner: CREATOR, 
            error: 'Image URL is required' 
        });
    }

    geminiVision2(imageUrl, instruction)
        .then((data) => {
            res.json({ 
                status: true, 
                creator: CREATOR, 
                result: data.analysis,
                metadata: {
                    imageUrl: data.metadata.imageUrl,
                    instruction: data.metadata.instruction
                }
            });
            count(); // Your analytics function
        })
        .catch((err) => {
            console.error(err); // Log the actual error
            res.status(500).json({ 
                status: false, 
                creator: CREATOR, 
                error: err.message || 'Failed to analyze image' 
            });
        });
});


router.get("/ai/shazam", (req, res) => {
    const audioUrl = req.query.url || req.query.audio || req.query.video;
    
    if (!audioUrl) {
        return res.status(400).json({ 
            status: false, 
            owner: CREATOR, 
            error: 'Audio/Video URL is required' 
        });
    }

    recognizeAudio(audioUrl)
        .then((data) => {
            if (data.status) {
                res.json({ 
                    status: true, 
                    creator: CREATOR,
                    result: {
                        title: data.title,
                        artist: data.artist,
                        album: data.album,
                        duration: data.duration,
                        genres: data.genres,
                        releaseDate: data.releaseDate
                    },
                    metadata: {
                        audioUrl: data.metadata.audioUrl,
                        recognitionService: data.metadata.recognitionService
                    }
                });
            } else {
                res.json({
                    status: false,
                    creator: CREATOR,
                    message: data.message
                });
            }
            count(); // Your analytics function
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ 
                status: false, 
                creator: CREATOR, 
                error: err.message || 'Failed to recognize audio' 
            });
        });
});



router.get("/ai/ilama", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getLlamaResponse(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/ai/gemini", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getGeminiResponse(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/ai/bard", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getBardResponse(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/ai/deepseek", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getDeepSeekResponse(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/ai/metai", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getMetaAIResponse(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/ai/blackbox", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getBlackboxResponse(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/dl/hentaivid", (req, res) => {
    fetchHentaiVideos()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});


router.get("/ai/gpt", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getLlamaResponse(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/ai/photoleap", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: 'Keithkeizzah', err: 'Need Prompt !' });
    axios.get('https://tti.photoleapapp.com/api/v1/generate?prompt=' + url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

// Football Routes
router.get("/ucl/standings", (req, res) => {
    uclStandings()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/ucl/scorers", (req, res) => {
    uclTopScorers()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/ucl/matches", (req, res) => {
    uclMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/ucl/upcomingmatches", (req, res) => {
    uclUpcomingMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/seriea/standings", (req, res) => {
    saStandings()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/seriea/scorers", (req, res) => {
    saTopScorers()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/seriea/matches", (req, res) => {
    saMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/seriea/upcomingmatches", (req, res) => {
    saUpcomingMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/ligue1/standings", (req, res) => {
    fl1Standings()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/ligue1/scorers", (req, res) => {
    fl1TopScorers()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/ligue1/matches", (req, res) => {
    fl1Matches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/ligue1/upcomingmatches", (req, res) => {
    fl1UpcomingMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/laliga/standings", (req, res) => {
    pdStandings()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/laliga/scorers", (req, res) => {
    pdTopScorers()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/laliga/matches", (req, res) => {
    pdMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/laliga/upcomingmatches", (req, res) => {
    pdUpcomingMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/fifa/standings", (req, res) => {
    wcStandings()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/fifa/scorers", (req, res) => {
    wcTopScorers()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/fifa/matches", (req, res) => {
    wcMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/fifa/upcomingmatches", (req, res) => {
    wcUpcomingMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/euros/standings", (req, res) => {
    ecStandings()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/euros/scorers", (req, res) => {
    ecTopScorers()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/euros/matches", (req, res) => {
    ecMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/euros/upcomingmatches", (req, res) => {
    ecUpcomingMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/bundesliga/standings", (req, res) => {
    bl1Standings()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/bundesliga/scorers", (req, res) => {
    bl1TopScorers()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/bundesliga/matches", (req, res) => {
    bl1Matches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/bundesliga/upcomingmatches", (req, res) => {
    bl1UpcomingMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/epl/standings", (req, res) => {
    getStandings()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/epl/scorers", (req, res) => {
    getTopScorers()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/epl/matches", (req, res) => {
    getMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/epl/upcomingmatches", (req, res) => {
    getUpcomingMatches()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

// images Routes

router.get("/logo", (req, res) => {
    logo()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/tempmail", (req, res) => {
    random_mail()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/get_inbox_tempmail", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need tempmail id !' });
    get_mails(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/tempnumber", (req, res) => {
    tempnumber()
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/tempnumbercode", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need tempmail number !' });
    tempnumbercode(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/ephoto360", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need ephoto360 url !' });
    var text1 = req.query.texk;
    if (!text1) return res.json({ status: false, creator: CREATOR, message: "[!] masukan parameter text1" });
    ephoto360(url, [text1])
        .then((data) => {
            res.set({ 'Content-Type': 'image/png' });
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

// Search Routes

router.get("/search/soundcloud", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Song Name !' });
    ssearch(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/search/bing", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Song Name !' });
    searchBing(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/search/lyrics", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Song Name !' });
    searchLyrics(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/search/tiktoksearch", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Song Name !' });
    searchTikTok(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/search/instauser", (req, res) => {
    const url = req.query.q || req.query.user;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Song Name !' });
    searchInstagramUsers(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/search/searchtweets", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Song Name !' });
    searchTweets(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/search/searchxvideos", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Song Name !' });
    searchXvideos(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/search/tiktokuserposts", (req, res) => {
    const url = req.query.q || req.query.user;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getUserPosts(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/search/spotify", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Song Name !' });
    searchSpotifyTracks(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/search/apkfab", async (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Apk Name !' });
    apks1(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/search/weather", async (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need region name !' });
    getWeatherData(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/search/sticker", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need query to search !' });
    stickersearch(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/search/modwhatsapp", (req, res) => {
    const text = req.query.text || req.query.q;
    if (!text) return res.send({ status: false, owner: CREATOR, result: 'Please give me a whatsapp name !' });
    modwhatsapp(text)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/search/happymodSearch", (req, res) => {
    const text = req.query.text || req.query.q;
    if (!text) return res.send({ status: false, owner: CREATOR, result: 'Please give me a name !' });
    happymodSearch(text)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/search/yts", (req, res) => {
    const text = req.query.query || req.query.q;
    if (!text) return res.send({ status: false, owner: CREATOR, result: 'Please give me a name !' });
    searchYouTube(text)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/search/wallpaperscraft", (req, res) => {
    const text = req.query.text || req.query.q;
    if (!text) return res.send({ status: false, owner: CREATOR, result: 'Please give me a image name !' });
    wallpaperscraft(text)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

// Movie Routes


router.get("/movie/sinhalasub/search", (req, res) => {
    const text = req.query.text || req.query.q;
    if (!text) return res.send({ status: false, owner: CREATOR, result: 'Please give me a movie of tvshow name !' });
    sinhalasub.search(text)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/movie/sinhalasub/movie", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, creator: CREATOR, err: 'Please give me a sinhalasub movie url !' });
    sinhalasub.movieDl(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/movie/sinhalasub/tvshow", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, creator: CREATOR, err: 'Please give me a sinhalasub tvshow url !' });
    sinhalasub.tvshow(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/movie/sinhalasub/episode", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Please give me a sinhalasub episode url !' });
    sinhalasub.episodeDl(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/movie/pirate/search", (req, res) => {
    const text = req.query.text || req.query.q;
    if (!text) return res.send({ status: false, owner: CREATOR, result: 'Please give me a movie of tvshow name !' });
    pirate.search(text)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/movie/pirate/movie", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, creator: CREATOR, err: 'Please give me a pirate movie url !' });
    pirate.movieDl(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/movie/zoom/search", (req, res) => {
    const text = req.query.text || req.query.q;
    if (!text) return res.send({ status: false, owner: CREATOR, result: 'Please give me a movie of subtitle name !' });
    zoom.search(text)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/movie/zoom/movie", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, creator: CREATOR, err: 'Please give me a sinhalasub movie url !' });
    zoom.movieDl(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/movie/firemovie", (req, res) => {
    const text = req.query.text || req.query.q;
    if (!text) return res.send({ status: false, owner: CREATOR, result: 'Please give me a name !' });
    firemovie(text)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

// Download Routes
router.get("/download/spotify", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getSpotifyTrack(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/download/tiktoktrend", (req, res) => {
    const url = req.query.q || req.query.region;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getTikTokTrends(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/download/porn", (req, res) => {
    const url = req.query.link || req.query.url;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getVideoDownload(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/download/apkfab", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Apk Id !' });
    apkd1(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/download/modwhatsappdl", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Apk Id !' });
    modwhatsappdl(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/download/modwadl", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Apk Id !' });
    modwadl(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/download/piniimg", (req, res) => {
    const text = req.query.q || req.query.text;
    if (!text) return res.send({ status: false, owner: CREATOR, result: 'Please give me some words !' });
    pinterestimg(text)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/download/twitter", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, result: 'Please give me a valid twitter video url !' });
    twitter(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: notwork });
            l(err);
        });
});

router.get("/download/ytmp3", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, result: 'Please give me a valid ytdl video url !' });
    ytmp3(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: notwork });
            l(err);
        });
});


router.get("/download/dlmp3", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, result: 'Please provide a YouTube video URL!' });
    dlmp3(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err.message || "An error occurred" });
            console.error(err);
        });
});

router.get("/download/dlmp4", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, result: 'Please provide a YouTube video URL!' });
    dlmp4(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err.message || "An error occurred" });
            console.error(err);
        });
});

router.get("/download/ytmp4", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, result: 'Please give me a valid ytdl video url !' });
    ytmp4(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: notwork });
            l(err);
        });
});

router.get("/download/wallpaper", (req, res) => {
    const q = req.query.text || req.query.q;
    const page = req.query.page;
    if (!q) return res.send({ status: false, owner: CREATOR, err: 'Please give me query !' });
    if (!page) return res.send({ status: false, owner: CREATOR, err: 'Please give me a page !' });
    wallpaper(q, page)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/download/tiktokdl", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Please give me tiktok url !' });
    tiktokdl(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data || {} });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: notwork });
            l(err);
        });
});
router.get("/download/instagramdl", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Please give me instagram url !' });
    instagramdl(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data || {} });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: notwork });
            l(err);
        });
});

router.get("/download/mfire", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Please give me mediafire url !' });
    mfire(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data || {} });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: notwork });
            l(err);
        });
});

router.get("/download/fbdown", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Please give me fb url !' });
    fbdown(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data || {} });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: notwork });
            l(err);
        });
});

router.get("/download/soundcloud", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url.includes('m.soundcloud.com')) return res.send({ status: false, owner: CREATOR, err: 'Wrong url !' });
    sdl(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data || {} });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: notwork });
            l(err);
        });
});

router.get("/download/appletone", (req, res) => {
    const text = req.query.text || req.query.q;
    if (!text) return res.send({ status: false, owner: CREATOR, result: 'Please give me a name !' });
    appletone(text)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/download/appletonedl", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Please give me appletone url !' });
    appletonedl(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data || {} });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: notwork });
            l(err);
        });
});

//stalkers
router.get("/stalker/tiktok", (req, res) => {
    const url = req.query.q || req.query.user;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    stalkTikTokUser(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/stalker/twitter", (req, res) => {
    const url = req.query.q || req.query.user;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    stalkTwitterUser(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/stalker/ig", (req, res) => {
    const url = req.query.q || req.query.user;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    stalkInstagramUser(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/stalker/ytchannel", (req, res) => {
    const url = req.query.q || req.query.user;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    stalkYouTubeChannel(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/stalker/country", (req, res) => {
    const url = req.query.q || req.query.region;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    getCountryInfo(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/stalker/npm", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    stalkNpmPackage(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/stalker/ip", (req, res) => {
    const url = req.query.q || req.query.query;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    stalkIpAddress(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});
router.get("/stalker/repostalk", (req, res) => {
    const url = req.query.link || req.query.url;
    if (!url) return res.send({ status: false, owner: CREATOR, err: 'Need Prompt !' });
    stalkGitHubRepo(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: err_mg });
            l(err);
        });
});

router.get("/stalker/wachannel", (req, res) => {
    const url = req.query.url || req.query.link;
    if (!url) return res.send({ status: false, owner: CREATOR, result: 'Please give me a valid channel url !' });
    wachannel(url)
        .then((data) => {
            res.send({ status: true, creator: CREATOR, result: data });
            count();
        })
        .catch((err) => {
            res.send({ status: false, creator: CREATOR, error: notwork });
            l(err);
        });
});



module.exports = router;
