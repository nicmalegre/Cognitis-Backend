const express = require('express');
const router = express.Router();
const User = require('../models/User')
const db = require('../db');
const app = express();

//When you go to 'http://localhost:3000/api/users' you will get all the users stored in the database
router.get("/",(req, res) =>{
    User.findAll()
    .then(users => {
        res.send(users)
    })
    .catch(err => console.log(err));
})

//When you go to 
router.get("/user/:mail",(req, res) =>{
    User.findOne({
        where: {
           mail : req.body.mail
    }
    })
    .catch(err => console.log(err));
})

//POST Method for save an user to the database. You have to include product, mail, password, country when you call this function.
router.post('/saveuser', (req, res) => {  
    const user =  User.build({
        product: req.body.product,
        mail: req.body.mail,
        password: req.body.password,
        country: req.body.country
    })
    user.save();
    res.send('Usuario guardado en la base de datos')
});

module.exports = router;

