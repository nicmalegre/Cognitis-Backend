const express = require("express");
const router = express.Router();
const User = require("../models/User");
const db = require("../db");
const bcrypt = require('bcrypt');


//Register
router.post("/saveuser", (req, res) => {
  //Check if the email exists in the DB
  User.findOne({
    where: {
      mail: req.body.mail,
    },
  })
    .then(async(usuario) => {
      //In case the email does not exist in the DB, the password is encrypted
      if (!usuario) {
        let hash = await bcrypt.hash(req.body.password, 10);
        const user = User.build({
          product: req.body.product,
          mail: req.body.mail,
          password: hash,
          country: req.body.country,
        });
        user.save();
        res.send("Usuario guardado en la base de datos");
      }
      // If email exists in BD, please reply error message
      else {
        res.json({ error: "el usuario ya existe" });
      }
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
module.exports = router;
