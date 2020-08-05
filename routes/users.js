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
    user.save();
    res.send('Usuario guardado en la base de datos')
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
        console.log('already used');
        console.log(user);
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

