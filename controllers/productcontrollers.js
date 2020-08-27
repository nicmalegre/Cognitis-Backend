const userCrtl = {};
const product = require('../models/products');
const products_providers = require('../models/products_providers');
const { Op, QueryTypes, Sequelize } = require("sequelize");
const { sequelize } = require('../models/products');

//GET all products
/*userCrtl.getProducts= async(req,res) => {
    const products = await product.findAll(); 
    res.json(products)
}*/


//FUNCTION FOR PAGINATION WHEN WE GET ALL THE PRODUCTS
const getPagination = (page, size) => { //Esta funcion controla si los parametros page y size fueron pasados
                                        //en el caso de que no existan, le establece un valor por defecto
    const limit = size ? +size : 10;//Si existe el parametro le pongo el valor del parametro y sino le pongo 0
    const offset = page ? page * limit : 0;//Si existe page se setea page*limit y sino 0
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {//Necesitamos devolver total items, los items, total de paginas y pagina actual
                                            //Esta funcion se encarga de devolver eso
    const { count: totalProducts, rows: products } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalProducts / limit);
    return { totalProducts, products, totalPages, currentPage };
};

//GET ALL PRODUCTS WITH PAGINATION
userCrtl.getProducts= async(req,res) => {
    const page = parseInt(req.params.page)
    const size = 10; //This is the same of limit. How many items we want to return for query.
    const { limit, offset } = getPagination(page, size);

    product.findAndCountAll({ limit, offset })
        .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        });
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
            product_package: req.body.product_package,
            product_package_customers: req.body.product_package_customers,
            product_min_margin: req.body.product_min_margin,
            product_max_margin: req.body.product_max_margin,  
            product_price: req.body.product_price,  
            product_bonification: req.body.product_bonification,
            product_price_bonification: req.body.product_price_bonification,    
            product_freight_cost: req.body.product_freight_cost,    
            product_accountant_type: req.body.product_accountant_type,    
            product_accountant_account: req.body.product_accountant_account,
            product_size: req.body.product_size,
            product_color: req.body.product_color,
            category: req.body.category,
            //Estos dos campos faltan mandar
            products_industry_id: req.body.products_industry_id,//req.body.products_industry_id,   
            product_branch_office_id: 41,
        });
        newProduct.save();
        res.send("Product saved on the db.");
      }
      // If the product´s name exists in BD, please reply error message
      else {
        res.json({ error: "The Product already exists on the db." });
      }
    })
    .catch((err) => {
      res.send("error:" + err);
    });
}


//Update one product
userCrtl.updateProduct= async(req,res) => {
    const {id_product} = req.params;
    product.findOne({
        where: {
          //  product_code: req.body.product_code,
          product_code: id_product,
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
    /*const providers = await products_providers.hasMany(providers,{foreignKey: 'product_id'})
    
    ({
        where: {
            product_id: req.body.product_id,
        },
    }); */

    //this is a raw query from sequelize
    const providers = await sequelize.query(
        "SELECT * from providers p inner join products_providers pp on p.provider_id = pp.provider_id where pp.product_id = :productId",
        {
            replacements: {
                productId: req.body.product_id
            },
            type: QueryTypes.SELECT
        }
    );

    res.json(providers)
}

userCrtl.getProductData = async(req,res) => {
    /*
    const select = 'select pd.*,pv.provider_id,pv.provider_name'
    const from = 'from products pd inner join products_stock ps on ps.product_id = pd.product_id inner join providers pv on ps.provider_id = pv.provider_id'
    const where = 'where :_idProducto = pd.product_id'
    */
    const call = 'call ObtenerDatosProducto(:_idProducto)'
    const [result,metadata] = await sequelize.query(
        `${call}`,
        {
            replacements: {
                _idProducto: parseInt(req.params.id_product),
            },
            type: QueryTypes.SELECT,
        }
    );
    
    console.log(metadata);
    const response = result[0];

    res.json(response);
}


//export module
module.exports = userCrtl;