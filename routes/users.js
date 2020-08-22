const express = require('express');
const session = require("express-session");
const user = require("../models/user");
const db = require("../db");
const bcrypt = require('bcrypt');
const router = express.Router();
const {getUsers} =require('../controllers/usercontrollers')
const {getUser} =require('../controllers/usercontrollers')
const {saveUser} =require('../controllers/usercontrollers')
const {emailVerification} =require('../controllers/usercontrollers')
const {updatePasswExpired} =require('../controllers/usercontrollers')

//When you go to '/api/users/' you will get all the users stored in the database
router.route('/')  
  .get(getUsers)

//When you go to '/api/users/getuser' you will get one user by sending an user_mail
router.route('/getuser/')  
  .post(getUser)


//FOR SAVE ONE NEW USER
router.route('/saveuser/')  
.post(saveUser)

//POST FOR CONTROL IF THE EMAIL EXISTS IN THE DATABASE
router.route('/emailverification/')  
.post(emailVerification)

//POST FOR UPDATE THE PASSWORDEXPIRED THE ONE USER
router.route('/update/user/:user_mail')
  .put(updatePasswExpired)

//Login
router.post("/login", (req, res) => {
  user.findOne({
    where: {
      mail: req.body.mail,
    },
  })
    .then(async(user) => {
          //console.log(password, user.password);
          let correctPassword = await bcrypt.compare(req.body.password, user.password);
          console.log(correctPassword);
          if (correctPassword){
            res.send("exito");
          }
          else {
            res.send("incorrecto")
          }
     })
    .catch((err) => {
      res.send("error:" + err);
    });
});

//ROUTE FOR VALIDATE EMAIL
router.post("/senduserinvitation", (req, res) => {
  const Newuser = user.build({});

  try {
    transporter.sendMail({
      to: req.body.mail,
      from: "sebasrz.rcia@gmail.com",
      subject: "Verification Code",
      html: `<div> 
                <h2>HI ${code}</h2> 
                <p>This code expire at ${thirtyMinutesLater.getHours()}:${thirtyMinutesLater.getMinutes()} from ${thirtyMinutesLater.toDateString()}</p>
              </div>`,
    });
  } catch (error) {
    console.log("Error to try send email", error);
  }
});

module.exports = router;
