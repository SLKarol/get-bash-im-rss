const fetch = require("node-fetch");
const HTMLParser = require("node-html-parser");
const TurndownService = require("turndown");

const turndownService = new TurndownService();

/**
 * @typedef ContentRSS
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} content - content of history
 * @property {string} title - title history
 */

/**
 * Возвращает текст тэга "description" в формате markdown
 * @param {Element} nodeItem
 * @param {string} [tagName=description] название тэга
 * @returns {string}
 */
function getDescriptionToMarkDown(nodeItem, tagName = "description") {
  return turndownService.turndown(
    nodeItem
      .querySelector(tagName)
      .text.replace("<![CDATA[", "")
      .replace("]]>", "")
  );
}

/**
 * Возвращает промис-массив содержимого rss-ленты баш-орга
 * @param {string} rssUrl Адрес ленты
 * @returns {Promise<Array.<ContentRSS>>}
 */
function getListBashOrg(rssUrl = "https://bash.im/rss/") {
  return fetch(rssUrl).then((response) =>
    response.text().then((htmlContent) => {
      const root = HTMLParser.parse(htmlContent);
      return Array.from(root.querySelectorAll("item")).map((item) => {
        const content = getDescriptionToMarkDown(item);
        const id = item.querySelector("guid").text;
        const bashContent = {
          content,
          id,
          title: item.querySelector("title").text,
        };
        return bashContent;
      });
    })
  );
}
module.exports = getListBashOrg;
