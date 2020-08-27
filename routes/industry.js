const express = require("express");
const router = express.Router();const nodemailer = require("nodemailer");
const industry_controller = require('./../controllers/industry.controller');
const industry = require("../models/industry");

//get all industries
router.route('/').get(industry_controller.getIndustries)

module.exports = router;
