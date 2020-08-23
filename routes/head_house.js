const express = require('express');
const router = express.Router();
const {postHead_house, getUsers} =require('../controllers/head_house.controllers')

//Register
router.route('/registerheadhouse')
  .post(postHead_house)

//Get all the users stored in the database
/*router.route('/')  
 .get(getUsers)
*/


module.exports = router;
