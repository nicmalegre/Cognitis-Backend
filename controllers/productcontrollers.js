const userCrtl = {};
const product = require('../models/products');

//GET all products
userCrtl.getProducts= async(req,res) => {
    const products = await product.findAll(); 
    res.json(products)
}

//GET all products with filters
userCrtl.getProductsWFilters= async(req,res) => {
    const products = await product.findAll({
        where: {
            product_name: req.body.product_name
            // product_brand: req.body.product_brand,
            // product_category: req.body.product_category,
        }
    });
    if (products) {
        res.json(products)
    } else {
        res.send(false)
    }
    
}

//GET one product with the id of product
userCrtl.getProduct= async(req,res) => {
    const products = await product.findOne({
        where: {
            product_id: req.body.product_id

        }
    });
    if (products) {
        res.json(products)
    } else {
        res.send(false)
    }
    
}


//export module
module.exports = userCrtl;