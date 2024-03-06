var express = require("express");
var router = express.Router();

const Store = require("../models/stores");
const puppeteer = require("puppeteer");

router.get("/", async function (req, res) {
  const city = req.query.city; // Récupérer la ville de recherche depuis les paramètres de requête

  if (!city) {
    res
      .status(400)
      .json({ error: "La ville de recherche n'est pas spécifiée." });
    return;
  }

  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto("https://www.monoprix.fr/trouver-nos-magasins", {
      waitUntil: "domcontentloaded",
    });

    await new Promise((r) => setTimeout(r, 2000));

    const inputSelector = "#store__search-input";
    await page.type(inputSelector, city);

    await page.click(".store__button-submit");

    const searchResultsSelector = ".ui.grid.store-list__container";
    await page.waitForSelector(searchResultsSelector);

    await new Promise((r) => setTimeout(r, 2000));

    const quotes = await page.evaluate(() => {
      let storeData = [];
      let storeElements = document.querySelectorAll(
        ".store-list__item-content"
      );

      for (const element of storeElements) {
        const nameElement = element.querySelector(".store-list__item-content__title");
        const addressElement = element.querySelector(".store-list__item-content__address");
        const scheduleElement = element.querySelector(".store-list__item-content__opening.opened");
      
        if (nameElement && addressElement && scheduleElement) {
          storeData.push({
            name: nameElement.textContent.trim(),
            adress: addressElement.textContent.trim(),
            schedule: scheduleElement.textContent.trim(),
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Monoprix_logo_2013.png",
            products: null,
          });
        }
      }
      

      const numberElements = storeData.length;

      return { storeData, numberElements };
    });

    let count = 0;

    for (const quote of quotes.storeData) {
      const existingStore = await Store.findOne({
        name: quote.name,
        adress: quote.adress,
      });

      if (!existingStore) {
        const adressStore = new Store({
          name: quote.name,
          adress: quote.adress,
          schedule: quote.schedule,
          products: quote.products,
          logoUrl: quote.logoUrl,
        });

        await adressStore.save();
        count++;
      }
    }

    res.json({ result: true, count });

    await browser.close();
  } catch (err) {
    console.error(err);
    res.json({
      result: false,
      error: "Une erreur s'est produite lors du scraping.",
    });
  }
});

module.exports = router;
