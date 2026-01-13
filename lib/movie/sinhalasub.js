const axios = require("axios");
const nexara = require("@dark-yasiya/nexara");
const cheerio = require("cheerio");
require("dotenv").config();

const CREATOR = "Vajira";

module.exports = class Sinhalasub {

  // ================= SEARCH =================
  async search(query) {
    try {
      const url = `https://sinhalasub.lk/?s=${encodeURIComponent(query)}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const movies = [];
      $("div.result-item").each((_, el) => {
        const link = $(el).find("div.title a").attr("href");
        const title = $(el).find("div.title a").text().trim();
        if (title && link) movies.push({ title, link });
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

  // ================= MOVIE DOWNLOAD =================
  async movieDl(query) {
    try {
      if (!query?.startsWith("https://")) {
        throw new Error("Invalid SinhalaSub.lk URL");
      }

      const $ = await nexara(query);

      const safeMatch = (txt) =>
        txt ? txt.match(/([A-Z][a-z]+|\d+\+?)/g) : [];

      const images = [];
      $("div.g-item a").each((_, el) => {
        const img = $(el).attr("href")?.trim();
        if (img) images.push(img);
      });

      const grabLinks = (selector) => {
        const arr = [];
        $(selector).find("tbody tr").each((_, row) => {
          const link = $(row).find("td a").attr("href");
          const quality = $(row).find("td:nth-child(2)").text().trim();
          const size = $(row).find("td:nth-child(3)").text().trim();
          if (link && quality && size) arr.push({ quality, size, link });
        });
        return arr;
      };

      const resolveLinks = async (list) =>
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

      const pixeldrain = await resolveLinks(grabLinks("#download"));
      const mega = await resolveLinks(grabLinks("#download-02"));
      const ddl = await resolveLinks(grabLinks("#download-03"));

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
          category: safeMatch($("div.sgeneros").text()),
          subtitle_author: $("div.profile-card-inf__title a").text(),
          description: $("#info p").first().text().trim(),
          director: $("#cast img").attr("alt") || "",
          images,
          pixeldrain_dl: pixeldrain,
          mega_dl: mega,
          ddl_dl: ddl
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
  async tvshow(query) {
    try {
      const $ = await nexara(query);

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
          originalTitle: $("div.custom_fields span").first().text(),
          imdb: $("#repimdb strong").text(),
          date: $("span.date").first().text(),
          average: $("div.custom_fields span").eq(8).text(),
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
  async episodeDl(query) {
    try {
      if (!query?.startsWith("https://")) {
        throw new Error("Invalid episode URL");
      }

      const $ = await nexara(query);

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
