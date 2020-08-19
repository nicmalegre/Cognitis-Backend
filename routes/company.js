const express = require('express');
const session = require("express-session");
const user = require("../models/user");
const db = require("../db");
const bcrypt = require('bcrypt');
const router = express.Router();
const companyController = require('../controllers/company_house')

router.route('/').get(companyController.getAllCompanies)

router.route('/newcompany').post(companyController.createCompany)


module.exports = router;