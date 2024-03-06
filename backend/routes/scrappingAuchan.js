var express = require('express');
var router = express.Router();
const puppeteer= require('puppeteer');
const Store= require('../models/stores');
const Product= require('../models/products');


router.get('/test',  async function(req, res, next) {
  const siteData= await crawlSite("https://www.auchan.fr/boissons-sans-alcool/colas-boissons-gazeuses-energisantes/ca-n0706");  
  for(let productPage of siteData){
    console.log("Page data",productPage);  
    if(productPage.productData && Array.isArray(productPage.productData)){
      console.log("productData",productPage.productData);
      try{
        await addProductsByCategoryToDB(productPage.productData, siteData[0].storeName, {name: "Boissons", subcategory: "Sodas"});
      }catch(err){
        console.log(err)
      }      
    }else{     
      res.json({error: "Could not retrieve product data", result: false})
      return;
    }
  }
  res.json({data: siteData, result: true});
});

async function addProductsByCategoryToDB(products, storeName, category){
  // console.log("addProductsByCategoryToDB products:", products);
  // console.log("Adding products: ",products.length);
  for (let product of products) {    
    // console.log("storeID",storeID);
    const storeID= await Store.findOne({name: storeName}).then(res=>{return res._id});
    const existingProduct = await Product.findOne({ name: product.name, subCategory: category.subCategory, "info.description": product.description, "info.store": storeID });
    const product_exists = existingProduct !== null;
    
    if(!product_exists){
      console.log("adding product",product)
      const productObj= new Product({
        name: product.name,   
        category: category.name,
        subCategory: category.subcategory,
        info:{
          productImage: product.imageUrl,
          store: storeID,
          description: product.description,
          price: product.price,
        }
      });
      productObj.save().then(res=>{
        console.log("added product",res);
      });
    }
  }
}

async function addStoresToDB(stores){
  // console.log(stores);
  for (let store of stores) {
    console.log("adding:",store)
    const existingStore = await Store.findOne({name: store.name})
    const store_exists = existingStore !== null;

    if(!store_exists){
      const storeObj= new Store({
        name: store.name,
        address: store.address,
        schedule: JSON.stringify(store.schedule),
        logoUrl: "https://www.totalbug.com/wp-content/uploads/2018/06/auchan-drive.png",
        products: null
      });
      storeObj.save().then(res=>{
        console.log("added store",res);
      });
    }
  }
}


// Import de la bibliothèque Puppeteer pour automatiser les interactions avec un navigateur web
async function crawlSite(url){
  console.log('Function Crawl Site executed');
  console.log(url);
  
    // Lance une instance de navigateur
    const browser = await puppeteer.launch();

    // Crée une nouvelle page dans le navigateur
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Accède à l'URL spécifiée
    await page.goto(url,  {waitUntil: "domcontentloaded",});

    // Sélectionne et rejette les cookies via des sélecteurs CSS
    const cookieModalWindow= ".ot-sdk-container"
    const cookieModalReject= "#onetrust-reject-all-handler"

    await page.waitForSelector(cookieModalWindow, { visible: true });
    await page.waitForSelector(cookieModalReject, { visible: true });
    await page.click(cookieModalReject);
    await page.screenshot({ path: `passedCookieModal.png`, fullPage: true })    

    // Sélectionne un élément pour afficher une fenêtre modale d'adresse
    const addressModalShow= ".journey-reminder-header>button"
    await page.waitForSelector(addressModalShow, { visible: true });
    await page.click(addressModalShow);
    
    await page.screenshot({ path: `findModal.png`, fullPage: true })

    // Sélectionne un élément pour afficher une autre fenêtre modale d'adresse
    await page.waitForSelector('#journey-update-modal', { visible: true, timeout: 8000 });


    // Saisit 'Paris' dans un champ de recherche  
    await page.screenshot({ path: `findInputAdresse.png`, fullPage: true })
    await page.type('.journey__search-input', 'Paris');
    const addressSuggestList= "#search_suggests"
    await page.waitForSelector(addressSuggestList, { visible: true });

    // Sélectionne la première suggestion d'adresse géographique
    const addressSuggest= "#search_suggests > li:first-child" 
    await page.waitForSelector(addressSuggest, { visible: true });
    await page.click(addressSuggest);
    await new Promise(r => setTimeout(r, 2000));

    // Sélectionne le premier magasin dans la liste de suggestions
    const addressItem= ".journeyPosItem"; 
    await page.waitForSelector(addressItem, { visible: true });

    // Affiche les détails du magasin en cliquant sur un bouton
    const scheduleButton= ".place-pos__details-expander";
    await page.waitForSelector(addressItem, { visible: true });
    await page.click(scheduleButton);
    await page.waitForSelector(".place-pos__details-content > .pos-details__line", { visible: true });
    await page.screenshot({ path: `storeCards.png`, fullPage: true })

    // Sélectionne tous les éléments ayant la classe CSS 'journeyPosItem'
    const stores = await page.$$eval('.journeyPosItem', storesCards => {
      // Utilise la méthode map pour parcourir chaque élément trouvé
        return storesCards.map(storeCard => {
          const name= storeCard.querySelector(".place-pos__name").textContent;
          const address= storeCard.querySelector(".place-pos__address span").textContent;
          const schedule= storeCard.querySelectorAll(".place-pos__details-content > .pos-details__line");

          // Utilise map pour parcourir chaque élément 'schedule' et créer un tableau 'scheduleData'
          const scheduleData=Array.from(schedule).map(singleLine => {
            // Vérifie si l'élément a une classe CSS 'pos-details__line-end' et un contenu textuel
            if (singleLine.querySelector(".pos-details__line-end") && singleLine.querySelector(".pos-details__line-end").textContent)

            // Si oui, extrait le texte de 'pos-details__line-start' comme jour et 'pos-details__line-end' comme heures
              return {Day: singleLine.querySelector(".pos-details__line-start").textContent.trim(), Hours: singleLine.querySelector(".pos-details__line-end").textContent.trim()};
              
            // Sinon, vérifie si l'élément a une balise 'span' dans 'pos-details__line-end'
            // et extrait le texte de 'pos-details__line-start > span' comme jour et 'pos-details__line-end > span' comme heures
              else if(singleLine.querySelector(".pos-details__line-end > span" ) && singleLine.querySelector(".pos-details__line-end > span").textContent)
              return {Day: singleLine.querySelector(".pos-details__line-start >span").textContent.trim(), Hours: singleLine.querySelector(".pos-details__line-end > span").textContent.trim()};
          }).filter((value)=>{
            return value !== null && value !== undefined && value !== '';
          });

          return {name: name, address: address, schedule: scheduleData};
        });
      });

    addStoresToDB(stores);

    let storeName= await page.evaluate(() => { return document.querySelector(".place-pos__name").textContent; });
    // console.log("storeName", storeName);
    const locationSelection= ".btnJourneySubmit";
    await page.waitForSelector(locationSelection, { visible: true });
    await page.click(locationSelection);

    await new Promise(r => setTimeout(r, 8000));

    await page.screenshot({ path: `listwithprices.png`, fullPage: true })

    const pagination= await page.$$eval(".pagination-links__container > .pagination-item"); //await page.$$ = document.querySelectorAll
    // console.log("content", pagination)
    // console.log(Array.isArray(pagination), pagination.length);

    //Inside a category, if there's a pagination we'll explore all of its pages and get products page by page
    let pagesData= [];
    for (let i = 1; i <= pagination.length; i++) {  
      // console.log("turn", i, "data", pagesData);          
      const getDataFromPage= await page.evaluate(() => {
        let data = [];
        let articles= document.querySelectorAll(".list__item:not(.animco)"); //.animco is a class used for in-page ads, don't need it        
        
        for (var article of articles){
          const price= article.querySelector(".product-price").innerText;
          const name= article.querySelector(".product-thumbnail__description strong").innerText;
          const description= article.querySelector(".product-thumbnail__description").innerText;
          const imageUrl= article.querySelector(".product-thumbnail__picture img").src;
          data.push({price: price, name: name, description: description, imageUrl: imageUrl});          
        }
        return data;
      });
      pagesData.push({page: i, productData: getDataFromPage, storeName: storeName});
      try {
        if (i < pagination.length) {
          await page.goto(`${url}?page=${i+1}`);
          // await page.waitForNavigation();
          await new Promise(r => setTimeout(r, 6000)); //wait until ms has passed     
          await page.screenshot({ path: `nextPage${i+1}.png`, fullPage: true })
        }   
      } catch (error) {
        console.error(error);
      }
  }
  // console.log(pagesData);
  return pagesData;    
}


module.exports = router;
