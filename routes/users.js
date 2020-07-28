const express = require('express');
const router = express.Router();
const User = require('../models/User')
const db = require('../db');

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

