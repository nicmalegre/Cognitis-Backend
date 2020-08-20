const express = require('express');
const router = express.Router();
const {postHead_house} =require('../controllers/head_house.controllers')

//Register
router.route("/registerheadhouse", postHead_house)
  //Check if the email exists in the DB


  //When you go to 'http://localhost:3000/api/users' you will get all the users stored in the database
router.route('/')  
  /*.get(getUsers)*/



module.exports = router;
