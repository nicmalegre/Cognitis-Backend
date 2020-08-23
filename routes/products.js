const express = require('express');
const session = require("express-session");
const db = require("../db");
const bcrypt = require('bcrypt');
const router = express.Router();
const {getProducts, getProduct, saveProduct, updateProduct, getProductsWFilters, deleteLogical, getProviders,
    getProductData} =require('../controllers/productcontrollers')



//When you go to 'http://localhost:3000/api/products/' you will get all the products stored in the database
router.route('/')  
.get(getProducts)

//When you go to 'http://localhost:3000/api/products/filters' you will get all the products with filters stored in the database
router.route('/filters')  
.post(getProductsWFilters)

//When you go to 'http://localhost:3000/api/products/getproduct' you will get the product with id stored in the database
router.route('/getproduct/:id_product')  
.get(getProduct)

//When you go to 'http://localhost:3000/api/products/updateproduct' you will get the product with id stored in the database
router.route('/updateProduct')  
.get(updateProduct)

//When you go to 'http://localhost:3000/api/products/deleteproduct' you will get the product with id stored in the database
router.route('/deleteProduct')  
.get(deleteLogical)

//POST FOR SAVE ONE PRODUCT
router.route('/saveproduct')  
.post(saveProduct)

//GET ALL THE PROVIDERS FOR ONE PRODUCT
router.route('/providers')  
.post(getProviders)

//GET ALL DATA FROM PRODUCT
router.route('/productdata/:id_product').
get(getProductData);



module.exports = router;