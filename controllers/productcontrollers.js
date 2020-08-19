const userCrtl = {};
const product = require('../models/products');

//obtine todas los usuarios
userCrtl.getProducts= async(req,res) => {
    const products = await product.findAll(); //devuelve todos los usuarios
    res.json(products)
}

// //Method for update the passwordExpired field of one user
// userCrtl.updatePasswExpired =  async(req, res) => {
//     user.update(
//         {user_password_expired: req.body.passwordExpired},
//         {returning: true, where: {user_mail: req.params.mail} }
//     )
//     .then(res.send("User updated"))
//     .catch(console.log("Can't update the user"))
// }

//export module
module.exports = userCrtl;