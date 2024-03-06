var express = require("express");
var router = express.Router();

const Product = require("../models/products");
const Store = require("../models/stores");
const puppeteer = require("puppeteer");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const getQuotes = async () => {
    try {
      const browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: null,
      });

      const page = await browser.newPage();

      await page.goto(
        "https://www.monoprix.fr/courses/soda-boisson-aromatisee-0000607",
        {
          waitUntil: "domcontentloaded",
        }
      );
     

      await new Promise((r) => setTimeout(r, 2000));
      async function autoScroll(page) {
        await page.evaluate(async () => {
          await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const distance = 100; // La distance à parcourir à chaque scroll
            const interval = setInterval(() => {
              const scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if (totalHeight >= scrollHeight) {
                clearInterval(interval);
                resolve();
              }
            }, 300); // L'intervalle de temps entre chaque scroll
          });
        });
      }

      // Appeler la fonction pour faire défiler la page complètement
      await autoScroll(page);

      const quotes = await page.evaluate(() => {
        let array = [];
        let elements = document.querySelectorAll(".grocery-item-item");
        for (const element of elements) {
          array.push({
            name: element
              .querySelector(".grocery-item-brand")
              .textContent.trim(),
            description: element
              .querySelector(".grocery-item-range")
              .textContent.trim(),
            price: element
              .querySelector(".grocery-item__normal-price")
              .textContent.trim(),
            productImage: element.querySelector(
              ".grocery-item__product-img img"
            ).src,
            category: "Boissons",
            subCategory: "Sodas",
          });
        }

        const numberElements = array.length;

        return { array, numberElements };
      });

      // Nous recherchons un magasin  dans notre BDD
      const store = await Store.findOne({ name: "MONOPRIX OPERA" });

      // Si le magasin n'est pas trouvé, nous envoyons une réponse d'erreur
      if (!store) {
        res.json({
          result: false,
          error:
            "Le magasin MONOPRIX OPERA n'a pas été trouvé en base de données.",
        });
        return;
      }

      // Nous créons une liste pour enregistrer les produits que nous voulons sauvegarder
      let productsToSave = [];
      for (const quote of quotes.array) {
      // Nous vérifions si le produit existe déjà dans la base de données
        const existingProduct = await Product.findOne({
          name: quote.name,
          "info.description": quote.description,
          "info.store": store._id,
        });

        const product_exists = existingProduct !== null;

        // Si le produit n'existe pas déjà, nous le préparons pour l'enregistrement
        if (!product_exists) {
          const product = new Product({
            name: quote.name,
            category: quote.category,
            subCategory: quote.subCategory,
            info: {
              price: quote.price,
              description: quote.description,
              productImage: quote.productImage,
              store: store._id,
            },
          });
          productsToSave.push(product);
        }
      }

      // Fermer le navigateur après avoir terminé toutes les opérations
      await browser.close();

      if (productsToSave.length > 0) {
      // Nous utilisons la méthode insertMany pour insérer plusieurs produits en une seule opération dans la collection "Product"
        const savedProducts = await Product.insertMany(productsToSave);
        console.log("Saved products", savedProducts);
      }

      res.json({ result: true, count: productsToSave.length });
    } catch (err) {
      console.error(err);
      res.json({
        result: false,
        error: "Une erreur s'est produite lors du scraping.",
      });
    }
  };

  getQuotes();
});

module.exports = router;
