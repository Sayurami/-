const axios = require("axios");
const cheerio = require("cheerio");
const nexara = require("@dark-yasiya/nexara");
require("dotenv").config();

const CREATOR = "Vajira";

module.exports = class Sinhalasub {

  // ================= SEARCH =================
  async search(query) {
    try {
      if (!query || query.length < 2) {
        return {
          status: false,
          creator: CREATOR,
          message: "Search text too short"
        };
      }

      const url = `https://sinhalasub.lk/?s=${encodeURIComponent(query)}`;
      const { data } = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      const $ = cheerio.load(data);
      const movies = [];

      // NEW SinhalaSub layout selector
      $("div.item").each((_, el) => {
        const link = $(el).find("a").attr("href");
        const title =
          $(el).find("a img").attr("alt") ||
          $(el).find(".data h3").text();

        if (title && link) {
          movies.push({
            title: title.trim(),
            link
          });
        }
      });

      return {
        status: true,
        creator: CREATOR,
        data: movies
      };

    } catch (error) {
      return {
        status: false,
        creator: CREATOR,
        error: error.message
      };
    }
  }

  // ================= MOVIE DETAILS =================
  async movieDl(url) {
    try {
      if (!url?.startsWith("https://")) {
        throw new Error("Invalid SinhalaSub movie URL");
      }

      const $ = await nexara(url);

      const images = [];
      $("div.g-item a").each((_, el) => {
        const img = $(el).attr("href");
        if (img) images.push(img);
      });

      const grabLinks = (selector) => {
        const arr = [];
        $(selector).find("tbody tr").each((_, row) => {
          const link = $(row).find("a").attr("href");
          const quality = $(row).find("td:nth-child(2)").text().trim();
          const size = $(row).find("td:nth-child(3)").text().trim();
          if (link) arr.push({ quality, size, link });
        });
        return arr;
      };

      const resolve = async (list) =>
        Promise.all(
          list.map(async (i) => {
            try {
              const { data } = await axios.get(i.link);
              const $d = cheerio.load(data);
              const final = $d("#link").attr("href");
              return { ...i, link: final || i.link };
            } catch {
              return i;
            }
          })
        );

      return {
        status: true,
        creator: CREATOR,
        data: {
          title: $("h1").first().text().trim(),
          date: $("span.date").first().text(),
          country: $("span.country").text(),
          tmdbRate: $("span.valor strong").text(),
          sinhalasubVote: $("span.dt_rating_vgs").text(),
          image: $("div.poster img").attr("src") || "",
          category: $("div.sgeneros").text().match(/([A-Z][a-z]+|\d+\+?)/g) || [],
          subtitle_author: $("div.profile-card-inf__title a").text(),
          description: $("#info p").first().text().trim(),
          director: $("#cast img").attr("alt") || "",
          images,
          pixeldrain_dl: await resolve(grabLinks("#download")),
          mega_dl: await resolve(grabLinks("#download-02")),
          ddl_dl: await resolve(grabLinks("#download-03"))
        }
      };

    } catch (error) {
      return {
        status: false,
        creator: CREATOR,
        error: error.message
      };
    }
  }

  // ================= TV SHOW =================
  async tvshow(url) {
    try {
      const $ = await nexara(url);
      const episodes = [];

      $("#seasons li").each((_, el) => {
        episodes.push({
          title: $(el).find(".numerando").text(),
          date: $(el).find(".date").text(),
          episode_link: $(el).find("a").attr("href")
        });
      });

      return {
        status: true,
        creator: CREATOR,
        data: {
          title: $("h1").first().text(),
          imdb: $("#repimdb strong").text(),
          date: $("span.date").first().text(),
          image: $("div.poster img").attr("src") || "",
          category: $("div.sgeneros").text().match(/([A-Z][a-z]+|\d+\+?)/g) || [],
          desc: $("#info p").text().trim(),
          director: $("#cast img").attr("alt") || "",
          episodes
        }
      };

    } catch (error) {
      return {
        status: false,
        creator: CREATOR,
        error: error.message
      };
    }
  }

  // ================= EPISODE DOWNLOAD =================
  async episodeDl(url) {
    try {
      const $ = await nexara(url);
      const links = [];

      $("table tbody tr").each((_, row) => {
        const link = $(row).find("a").attr("href");
        const quality = $(row).find("td:nth-child(2)").text().trim();
        const size = $(row).find("td:nth-child(3)").text().trim();
        if (link) links.push({ quality, size, link });
      });

      return {
        status: true,
        creator: CREATOR,
        data: {
          title: $("#info h1").text(),
          ep_name: $("#info h3").text(),
          date: $("#info .date").text(),
          desc: $("#info p").text().trim(),
          images: $("div.g-item a").map((_, e) => $(e).attr("href")).get(),
          dl_links: links
        }
      };

    } catch (error) {
      return {
        status: false,
        creator: CREATOR,
        error: error.message
      };
    }
  }
};
