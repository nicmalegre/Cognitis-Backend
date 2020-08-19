const userCrtl = {};
const user = require('../models/user');

//obtine todas los usuarios
userCrtl.getUsers= async(req,res) => {
    const users = await user.findAll(); //devuelve todos los usuarios
    res.json(users)
}

//Method for update the passwordExpired field of one user
userCrtl.updatePasswExpired =  async(req, res) => {
    user.update(
        {user_password_expired: req.body.passwordExpired},
        {returning: true, where: {user_mail: req.params.mail} }
    )
    .then(res.send("User updated"))
    .catch(console.log("Can't update the user"))
}

//export module
module.exports = userCrtl;
