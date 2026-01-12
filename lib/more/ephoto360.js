const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
/**
 * Scrapes and processes the ephoto360 effect creation.
 * @param {string} url - The URL to process.
 * @param {string} texk - The text to use in the effect.
 * @returns {Promise<Object>} - The result with the image URL or an error message.
 */
//const scrapeEphotoEffect = async (url, texk) => {
async function ephoto360(url, texk) {	
  try {
    // Create a new FormData instance
    let form = new FormData();

    // Make a GET request to fetch the page
    let gT = await axios.get(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
      },
    });

    // Load the HTML page using cheerio
    let $ = cheerio.load(gT.data);

    // Extract the necessary form fields and the provided text
    let token = $("input[name=token]").val();
    let build_server = $("input[name=build_server]").val();
    let build_server_id = $("input[name=build_server_id]").val();

    // Append form data
    form.append("text[]", texk);
    form.append("token", token);
    form.append("build_server", build_server);
    form.append("build_server_id", build_server_id);

    // Send the form data using a POST request
    let res = await axios({
      url: url,
      method: "POST",
      data: form,
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        cookie: gT.headers["set-cookie"]?.join("; "),
        ...form.getHeaders(),
      },
    });

    // Parse the response to extract the form value
    let $$ = cheerio.load(res.data);
    let json = JSON.parse($$("input[name=form_value_input]").val());
    json["text[]"] = json.text;
    delete json.text;

    // Make another POST request to create the image effect
    let { data } = await axios.post("https://en.ephoto360.com/effect/create-image", new URLSearchParams(json), {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        cookie: gT.headers["set-cookie"].join("; "),
      },
    });

    // Return the full URL of the generated image
    return {
      status: 'success',
      Author: '@VajiraTech',
      imageUrl: build_server + data.image,
    };
  } catch (error) {
    return {
      status: 'error',
      Author: '@VajiraTech',
      message: error.response?.data?.reason || error.message || 'Error occurred while processing the image effect.',
    };
  }
};

module.exports = ephoto360
