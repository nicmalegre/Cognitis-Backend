const userCrtl = {};
const user = require('../models/user');

//obtine todas las notas
userCrtl.getUsers= async(req,res) => {
    const users = await user.findAll(); //devuelve todos las notas
    res.json(users)
}

//export module
module.exports = userCrtl;
