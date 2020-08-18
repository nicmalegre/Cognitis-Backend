const express = require("express");
const express = require('express');
const session = require("express-session");
const router = express.Router();
const user = require("../models/user");
const db = require("../db");
const bcrypt = require('bcrypt');


//Register
router.post("/saveuser", (req, res) => {
  //Check if the email exists in the DB
  user.findOne({
    where: {
      mail: req.body.mail,
    },
  })
    .then(async(usuario) => {
      //In case the email does not exist in the DB, the password is encrypted
      if (!usuario) {
        let hash = await bcrypt.hash(req.body.password, 10);
        const Newuser = user.build({
          product: req.body.product,
          mail: req.body.mail,
          password: hash,
          country: req.body.country,
        });
        Newuser.save();
        res.send("Usuario guardado en la base de datos");
      }
      // If email exists in BD, please reply error message
      else {
        res.json({ error: "el usuario ya existe" });
      }
//When you go to 'http://localhost:3000/api/users' you will get all the users stored in the database
router.get("/",(req, res) =>{
    User.findAll()
    .then(users => {
        res.send(users)
    })
    .catch(err => console.log(err));
})

//FOR DELETE AN USER 'http://localhost:3000/api/users/delete/:mail' FOR THE DATABASE
router.get('/', async(req, res) => {
    const users = await User.findAll();
    res.send(users)
})

/*router.get("/",(req, res) =>{
    User.findAll()
    .then(users => {
        res.send(users)
    })
    .catch(err => console.log(err));
})*/


//POST Method for save an user to the database. You have to include product, mail, password, country when you call this function.
router.post('/saveuser', (req, res) => {  
    const user =  User.build({
        product: req.body.product,
        mail: req.body.mail,
        password: req.body.password,
        country: req.body.country
    })
    .catch((err) => {
      res.send("error:" + err);
    });
});

//Login
router.post("/login", (req, res) => {
  //console.log(req.body);
  User.findOne({
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
//POST FOR CONTROL IF THE EMAIL EXISTS IN THE DATABASE
router.post('/emailverification', async(req, res) => {
    const user = await User.findOne({
        where: {
            mail: req.body.mail
        }
    })

    if(user){
        console.log('already used');
        console.log(user);
        res.json({
            'alreadyUsed' : true
        })
    }else
    {
        console.log('not used yet');
        res.json({
            'alreadyUsed' : false
        })
    }
})

//POST FOR FIND ONE USER WITH AN EMAIL
router.post('/getUser', async(req, res) => {
    const user = await User.findOne({
        where: {
            mail: req.body.mail
        }
    })
    if(user){
        console.log(req.session.user_id)
        res.send(user)
    }else
    {
        res.send(false)
    }
})

//PUT Method for update the passwordExpired field of one user
router.put('/updateUser/:mail', function (req, res) {
    User.update(
        {passwordExpired: req.body.passwordExpired},
        {returning: true, where: {mail: req.params.mail} }
    )
    .then(res.send("User updated"))
    .catch(console.log("Can't update the user"))
   })


module.exports = router;
