var express = require('express');
var router = express.Router();
const Product = require('../models/products');

router.get('/search/:name', (req, res) => {
    if (!req.params.name || req.params.name === "") return res.json({result : false}) ;
Product.find({name: { $regex: new RegExp(req.params.name, "i") }}).then((data) => {
    // console.log(data);
    if (data.length>=1) {
        res.json({result : true , produits : data})
    } else {
        res.json({result : false , erreur : 'Product not found' , })
    }
    }) 
});

router.get('/list/:subCategory', (req, res) => {    
    Product.find({subCategory : { $regex: new RegExp(req.params.subCategory, "i") } }).then((data) => {
        // console.log(data.length);
        if (data.length>=1) {
            res.json({result : true , produits : data})
        } else {
            res.json({result : false , erreur : 'Product not found' , })
        }
    }) 
});


router.post('/getByUrl', (req, res) => {
    Product.find({"info.productImage": req.body.urlImage})
    .populate("info.store").then((data) => {  
           
        if (data.length>=1) {
            res.json({result : true , produits : data})
        } else {
            res.json({result : false , erreur : 'Product not found' , })
        }
    }) 
});

module.exports = router;