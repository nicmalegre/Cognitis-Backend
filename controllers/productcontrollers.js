const userCrtl = {};
const product = require('../models/products');

//GET all products
userCrtl.getProducts= async(req,res) => {
    const products = await product.findAll(); 
    res.json(products)
}



//export module
module.exports = userCrtl;