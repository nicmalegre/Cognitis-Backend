const userCrtl = {};
const product = require('../models/products');
const products_providers = require('../models/products_providers');
const { Op, QueryTypes, Sequelize } = require("sequelize");
const { sequelize } = require('../models/products');

//GET all products
userCrtl.getProducts= async(req,res) => {
    const products = await product.findAll(); 
    res.json(products)
}

//GET all products with filters
userCrtl.getProductsWFilters= async(req,res) => {

    // console.log(req.body)   
    // const products = await product.findAll({   
             
        
    //     //Codigo y Proveedor estan comentados porque no se encuentran en la tabla de producto
    //     where: {
    //         [Op.or]: { product_id: {
    //             [Op.and]:{[Op.eq]: req.body.product_id, [Op.ne]: null}
    //         },
    //         product_name: {
    //             [Op.and]:{[Op.eq]: req.body.product_name, [Op.ne]: null}
    //         },
    //         product_brand: {
    //             [Op.and]:{[Op.eq]: req.body.product_brand, [Op.ne]: null}
    //         },
    //         // product_provider: {
    //         //     [Op.or]:{[Op.eq]: req.body.product_provider, [Op.ne]: null}
    //         // },
    //         category: {
    //             [Op.and]:{[Op.eq]: req.body.product_category, [Op.ne]: null} 
    //         },
    //         product_type: {
    //             [Op.and]:{[Op.eq]: req.body.product_type, [Op.ne]: null}
    //         }}
    //     }
    // });

    const products = await sequelize.query(
        "SELECT * from PRODUCTS where ((:productId = product_id or :productId is null) and (:productName = product_name or :productName is null) and (:productBrand = product_brand  or :productBrand is null) and (:productCategory = category or :productCategory is null) and (:productType = product_type or :productType is null))",
        {
            replacements: {
                productId: req.body.product_id,
                productName: req.body.product_name,
                productBrand: req.body.product_brand,
                productCategory: req.body.category,
                productType: req.body.product_type
            },
            type: QueryTypes.SELECT
        }
    );

    if (products) {
        res.json(products)
    } else {
        res.send(false)
    }
    
}



//GET one product with the id of product
userCrtl.getProduct= async(req,res) => {
    let products = await product.findOne({
        where: {
            product_id: req.params.id_product

        }
    });
    if (products) {
        res.json(products)
    } else {
        res.send(false)
    }
}

//POST FOR SAVE A NEW PRODUCT
userCrtl.saveProduct= async(req,res) => {
    //Check if the product exists in the DB
  product.findOne({
    where: {
        product_name: req.body.product_name,
    },
  })
    .then(async(producto) => {
      //In case the product´s name does not exist in the DB
      if (!producto) {
        const newProduct = product.build({
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_brand: req.body.product_brand,
            product_type: req.body.product_type,
            product_is_dollar: req.body.product_is_dollar,
            product_in_ecommerce: req.body.product_in_ecommerce,
            product_unit: req.body.product_unit,
            product_vol: req.body.product_vol,
            product_bultos: req.body.product_bultos,
            product_bultos_clientes: req.body.product_bultos_clientes,
            product_minimium_margin: req.body.product_minimium_margin,
            product_maximium_margin: req.body.product_maximium_margin,  
            product_price: req.body.product_price,  
            product_bonification: req.body.product_bonification,
            product_price_bonification: req.body.product_price_bonification,    
            product_freight_cost: req.body.product_freight_cost,    
            product_accountant_type: req.body.product_accountant_type,    
            product_accountant_account: req.body.product_accountant_account,
            product_size: req.body.product_size,
            product_color: req.body.product_color,
            category: req.body.category,
            products_industry_id: req.body.products_industry_id,   
        });
        newProduct.save();
        res.send("Product saved on the db.");
      }
      // If the product´s name exists in BD, please reply error message
      else {
        res.json({ error: "The user already exists on the db." });
      }
    })
    .catch((err) => {
      res.send("error:" + err);
    });
}


//Update one product
userCrtl.updateProduct= async(req,res) => {
    
    product.findOne({
        where: {
            product_code: req.body.product_code,
        },
    })
    
    .then(async(producto) => {
            product.update(
                    {product_name: req.body.product_name},
                    {product_description: req.body.product_description},
                    {product_brand: req.body.product_brand},
                    {product_type: req.body.product_type},
                    {product_is_dollar: req.body.product_is_dollar},
                    {product_in_ecommerce: req.body.product_in_ecommerce},
                    {product_unit: req.body.product_unit},
                    {product_vol: req.body.product_vol},
                    {product_bultos: req.body.product_bultos},
                    {product_bultos_clientes: req.body.product_bultos_clientes},
                    {product_minimium_margin: req.body.product_minimium_margin},
                    {product_maximium_margin: req.body.product_maximium_margin},  
                    {product_price: req.body.product_price},  
                    {product_bonification: req.body.product_bonification},
                    {product_price_bonification: req.body.product_price_bonification},    
                    {product_freight_cost: req.body.product_freight_cost},    
                    {product_accountant_type: req.body.product_accountant_type},    
                    {product_accountant_account: req.body.product_accountant_account},
                    {product_size: req.body.product_size},
                    {product_color: req.body.product_color},
                    {category: req.body.category},
                    {products_industry_id: req.body.products_industry_id}
            )
            .then(res.send("Product updated"))
            .catch(console.log("Can't update the product"))
    })
    .catch((err) => {
    res.send("error:" + err);
    });
}


//Logical Delete of product
userCrtl.deleteLogical= async(req,res) => {
    product.update(
        {product_state: req.body.product_state},
        
    )
    .then(res.send("State updated"))
    .catch(console.log("Can't update the state"))
}

//GET ALL THE PROVIDERS FOR ONE PRODUCT
userCrtl.getProviders= async(req,res) => {
    const providers = await products_providers.findAll({
        where: {
            product_id: req.body.product_id,
        },
    }); 

    res.json(providers)
}


//export module
module.exports = userCrtl;