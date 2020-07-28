const express = require('express');
const router = express.Router();
const User = require('../models/User')
const db = require('../db');

router.post('/saveuser', (req, res) => {
    console.log(req.body)

    /* const user = await User.create({
        product: req.body.product_id,
        mail: req.body.mail,
        password: req.body.password,
        country: req.body.country
    })

    user.save(); */
});

