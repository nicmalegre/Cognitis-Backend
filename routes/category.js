const express = require('express');
const session = require("express-session");
const db = require("../db");
const bcrypt = require('bcrypt');
const router = express.Router();
const {getCategories, getCategory} =require('../controllers/categorycontrollers.js')



//ROUTE FOR GET ALL THE CATEGORIES
router.route('/')  
.get(getCategories)

//ROUTE FOR GET ONE CATEGORY
router.route('/getcategory/')  
.post(getCategory)





module.exports = router;