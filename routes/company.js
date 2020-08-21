const express = require('express');
const session = require("express-session");
const user = require("../models/user");
const db = require("../db");
const bcrypt = require('bcrypt');
const router = express.Router();
const companyController = require('../controllers/company_house.controllers')

router.route('/').get(companyController.getAllCompanies)

router.route('/newcompany').post(companyController.createCompany)

router.route('/headhouse/:head_house_id').get(companyController.getCompanies_headhouse)

router.route('/headhouse/:head_house_id/company/newcompany').post(companyController.createCompany)
//ROUTE FOR DELETE ONE COMPANY (Logical delete)
router.route('/deletecompany/').post(companyController.deleteCompany)

router.route('/headhouse/:head_house_id/company/:company_id').put(companyController.putCompany)

module.exports = router;