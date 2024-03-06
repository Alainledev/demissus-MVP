var express = require('express');
var router = express.Router();
const Store = require('../models/stores');

const puppeteer = require('puppeteer');

router.post("/", function (req, res, next) {
const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://www.carrefour.fr/magasin/type/drive/paris-75056", {
    waitUntil: "domcontentloaded",
  });

  const driveStores = await page.evaluate(() => {
    let array = [];
    let elements = document.querySelectorAll(
      ".store-locator-list__item"
    );

    for (const element of elements) {
      array.push({
        name: 'Carrefour ' + element.querySelector(".store-card__store-name.pl-text.pl-text--size-m.pl-text--style-p.pl-text--bold").textContent.trim(),
        schedule: element.querySelector(".ds-store-schedule__slot").textContent.trim(),
        address : element.querySelector(".store-card__address.pl-text.pl-text--size-m.pl-text--style-caption").textContent.trim(),
        logoUrl: 'https://logo-marque.com/wp-content/uploads/2020/11/Carrefour-Logo.png',
      });
    }
const numberElements = array.length;

return { array, numberElements };
  }); 

console.log(driveStores.array, driveStores.numberElements);

  

  let count = 0
  for (const drive of driveStores.array) {
    count++
    const store = new Store({
        name: drive.name,
        schedule: drive.schedule,
        address: drive.address,
        logoUrl: drive.logoUrl,
        products : null,
    });

const newStore = await store.save();
console.log("newStore", newStore);
  }

res.json({ result: true });
};

getQuotes();
});

module.exports = router;