var express = require('express');
var router = express.Router();
const Product = require('../models/products');
const Store = require('../models/stores');

const puppeteer = require('puppeteer');

router.post("/", function (req, res, next) {
const getproducts = async () => {
  //explorateur "puppeteer" qui nous aidera à parcourir des pages Web
  const browser = await puppeteer.launch({
    headless: false, // Pour voir ce que fait l'explorateur
    defaultViewport: null, // Nous voulons que la fenêtre soit de taille normale
  });

  // Ouvrir une nouvelle page dans l'explorateur
  const page = await browser.newPage();

  await page.goto("https://www.carrefour.fr/r/boissons/colas-thes-glaces-et-soft-drinks", {
    waitUntil: "domcontentloaded", // Nous attendons que la page soit prête
  });

  // Fonction qui fait défiler la page vers le bas automatiquement 
  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        const distance = 100; 
        const interval = setInterval(() => {
          const scrollHeight = document.body.scrollHeight; // hauteur totale de la page 
          window.scrollBy(0, distance);
          totalHeight += distance;

      if (totalHeight >= scrollHeight) {
        clearInterval(interval); 
        resolve();
      }
    }, 100); 
  });
});
  }

  // Appeler la fonction pour faire défiler la page complètement
  await autoScroll(page);

  const products = await page.evaluate(() => {
    let array = [];
    let elements = document.querySelectorAll(
      ".main-vertical.ds-product-card-refonte"
    );

    const regex = /\b[A-Z]+\b/g
    for (const element of elements) {
      const nameText = element.querySelector(".product-card-title__text.pl-text.pl-text--size-m.pl-text--style-p.pl-text--bold").textContent.trim();
      const name = (nameText.match(regex) || []).join(" "); // Rejoint les mots en majuscule avec un espace
      array.push({
        name: name,
        description: element.querySelector(".product-card-title__text.pl-text.pl-text--size-m.pl-text--style-p.pl-text--bold").textContent.trim(),
        price: element.querySelector(".product-price__amount-value").textContent.trim(),
        productImage: element.querySelector(".main-vertical--image .product-card-image__image").src,
        category: "Boissons" ,
        subCategory: "Sodas",
      });
    }
    const numberElements = array.length;
    
    return { array, numberElements };
  });   

  let storeCarrefour = await Store.findOne({ name: 'Carrefour City Paris Lacépède' })
  .then(data => {
    return data._id;
  });

  let i = 0
  for (i; i< products.array.length ; i++) {
    
    const product = new Product({
      name: products.array[i].name,
      category: products.array[i].category,
      subCategory: products.array[i].subCategory,
      info: {
        price: products.array[i].price,
        description: products.array[i].description,
        productImage: products.array[i].productImage,
        store : storeCarrefour,
      },
    });

const newProduct = await product.save();
// console.log("newProduct", newProduct);
  }

res.json({ result: true, i });
};

getproducts();
});

module.exports = router;