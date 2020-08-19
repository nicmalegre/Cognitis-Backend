const express = require('express');
const session = require("express-session");
const db = require("../db");
const bcrypt = require('bcrypt');
const router = express.Router();
const {getProducts, getProduct} =require('../controllers/productcontrollers')
const {getProductsWFilters} =require('../controllers/productcontrollers')


  //When you go to 'http://localhost:3000/api/products/' you will get all the products stored in the database
router.route('/')  
  .get(getProducts)

  //When you go to 'http://localhost:3000/api/products/filters' you will get all the products with filters stored in the database
  router.route('/filters')  
  .get(getProductsWFilters)

    //When you go to 'http://localhost:3000/api/products/getproduct' you will get the product with id stored in the database
  router.route('/getproduct')  
  .get(getProduct)


module.exports = router;