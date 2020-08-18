const express = require('express');
const session = require("express-session");
const user = require("../models/user");
const db = require("../db");
const bcrypt = require('bcrypt');
const router = express.Router();

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
    })
    .catch((err) => {
      res.send("error:" + err);
    });
  });

  //When you go to 'http://localhost:3000/api/users' you will get all the users stored in the database
router.get("/",(req, res) =>{
    user.findAll()
    .then(users => {
        res.send(users)
    })
    .catch(err => console.log(err));
})

//FOR DELETE AN USER 'http://localhost:3000/api/users/delete/:mail' FOR THE DATABASE
/*router.get('/', async(req, res) => {
    const users = await user.findAll();
    res.send(users)
})
*/
/*router.get("/",(req, res) =>{
    User.findAll()
    .then(users => {
        res.send(users)
    })
    .catch(err => console.log(err));
})*/


//Login
router.post("/login", (req, res) => {
  //console.log(req.body);
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

//POST FOR CONTROL IF THE EMAIL EXISTS IN THE DATABASE
router.post('/emailverification', async(req, res) => {
    const newuser = await user.findOne({
        where: {
            mail: req.body.mail
        }
    })

    if(newuser){
        console.log('already used');
        console.log(newuser);
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
    const newuser = await user.findOne({
        where: {
            mail: req.body.mail
        }
    })
    if(newuser){
        console.log(req.session.user_id)
        res.send(newuser)
    }else
    {
        res.send(false)
    }
})

//PUT Method for update the passwordExpired field of one user
router.put('/updateUser/:mail', function (req, res) {
    user.update(
        {passwordExpired: req.body.passwordExpired},
        {returning: true, where: {mail: req.params.mail} }
    )
    .then(res.send("User updated"))
    .catch(console.log("Can't update the user"))
   })

router.post("/senduserinvitation", (req, res) => {
  const user = User.build({});

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
