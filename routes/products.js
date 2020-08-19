const express = require('express');
const session = require("express-session");
const db = require("../db");
const bcrypt = require('bcrypt');
const router = express.Router();
const {getProducts} =require('../controllers/productcontrollers')


  //When you go to 'http://localhost:3000/api/products/todos' you will get all the users stored in the database
router.route('/todos')  
  .get(getProducts)


module.exports = router;