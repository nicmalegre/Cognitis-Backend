const categoryCrtl = {};
const category = require('../models/category');

//GET ALL THE CATEGORIES
categoryCrtl.getCategories= async (req , res) => {
    const categories = await category.findAll(); //Return all the categories
    res.json(categories)
}

//GET ONE CATEGORY WITH AN ID
categoryCrtl.getCategory= async(req,res) => {
    const newcategory = await category.findOne({
        where: {
            category_id: req.body.category_id
        }
    })
    if(newcategory){
        res.send(newcategory)
    }else
    {
        res.send("La categoria no fue encontrada.")
    }
}

//export module
module.exports = categoryCrtl;
