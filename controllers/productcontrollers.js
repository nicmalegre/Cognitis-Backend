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
        (req.body.product_providers === null) ?
        "SELECT * from PRODUCTS  where ((:productId = product_id or :productId is null)  and (:productName = product_name or :productName is null) and (:productBrand = product_brand  or :productBrand is null) and (:productCategory = category or :productCategory is null) and (:productType = product_type or :productType is null)) limit 10 "
         : "SELECT * from PRODUCTS INNER JOIN PRODUCTS_PROVIDERS ON PRODUCTS.product_id = PRODUCTS_PROVIDERS.product_id  where ((:productId = PRODUCTS.product_id or :productId is null)  and (:providerId = PRODUCTS_PROVIDERS.provider_id or :providerId is null)  and (:productName = PRODUCTS.product_name or :productName is null) and (:productBrand = PRODUCTS.product_brand  or :productBrand is null) and (:productCategory = PRODUCTS.category or :productCategory is null) and (:productType = PRODUCTS.product_type or :productType is null)) limit 10"            
        ,{
            replacements: {
                productId: req.body.product_id,
                productName: req.body.product_name,
                productBrand: req.body.product_brand,
                productCategory: req.body.category,
                productType: req.body.product_type,
                providerId: req.body.product_providers,
                
            },
            type: QueryTypes.SELECT
        },
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
    
    const call = 'call GuardarProducto(:prodName,:descrip,:brand,:typeProd,:isDollar,:ecommerce,:unit,:vol,:package,:packageCustomers,:minMargin,:maxMargin,:listPrice,:bonification,:priceBonification,:freightCost,:accountantType,:accountantAccount,:productMaterial,:origin,:shipping,:warranty,:barcode,:stat,:maker,:countryTax,:countryWithTax,:category,:productBranchOffice,:productIndustryName)'
    const insertResult = await sequelize.query(
        `${call}`,
        {
            replacements: {
                prodName:req.body.product_name,
                descrip: req.body.product_description,
                brand: req.body.product_brand,
                typeProd: req.body.product_type,
                isDollar: req.body.product_is_dollar,
                ecommerce: req.body.product_in_ecommerce,
                unit:req.body.product_unit,
                vol: req.body.product_vol,
                package: req.body.product_package,
                packageCustomers: req.body.product_package_customers,
                minMargin:req.body.product_min_margin,
                maxMargin:req.body.product_max_margin,
                listPrice : 10,
                bonification: req.body.product_bonification,
                freightCost: req.body.product_freight_cost,
                priceBonification: req.body.product_price_bonification,
                accountantType: req.body.product_accountant_type,
                accountantAccount: req.body.product_accountant_account,
                productMaterial: req.body.product_material,
                origin: req.body.product_origin,
                shipping: req.body.product_shipping,
                warranty: req.body.product_warranty,
                barcode: req.body.product_barcode,
                stat: req.body.product_status,
                maker: "Yo lo hice",
                countryTax: "Lobo De Mar",
                countryWithTax: "Lobo De Mar 35",
                category: req.body.category,
                //productsIndustryId: req.body.products_industry_id,
                productBranchOffice: 41,
                productIndustryName: req.body.products_industry_name
            },
            type: QueryTypes.SELECT,
        }
    );
    
    const lastId = insertResult[0][0].lastindex;

    if(req.body.products_industry_name === 'retail'){
    const insert = 'insert into products_retail(product_id,product_line,product_seed,product_service,product_serie,product_NTecnico,product_status,product_technical_data,product_model)';
    const val = 'values(:prodId,:productLine,:productSeed,:prodService,:productSerie,:productNTecnico,:productStatus,:productTD,:productModel)'
    const insertResult2 = await sequelize.query(
        `${insert} ${val}`,
        {
            replacements: {
                prodId: lastId,
                productLine: req.body.product_line,
                productSeed: req.body.product_seed,
                prodService: req.body.product_serie,
                productSerie: req.body.product_serie,
                productNTecnico: req.body.product_NTecnico,
                productStatus:req.body.product_status,
                productTD: req.body.product_technical_data,
                productModel: req.body.product_model
            },
            type: QueryTypes.INSERT,
        })
    }
    else if(req.body.products_industry_name === 'indumentary'){
        const insert = 'insert into products_indumentary(product_id,product_curve,product_color,product_season,product_status)';
        const val = 'values(:prodId,:productCurve,:productColor,:productSeason,:productStatus)'
        const insertResult2 = await sequelize.query(
            `${insert} ${val}`,
            {
            replacements: {
                prodId: lastId,
                productCurve: req.body.product_curve,
                productColor: req.body.product_color,
                productSeason: req.body.product_season,
                productStatus: req.body.product_status,
            },
            type: QueryTypes.INSERT,
        })
    }

    const insert3 = 'insert into products_providers(product_id,provider_id,product_provider_status)';
    const valuesInsertPdPv = 'values(:prodId,:provId,:prodStatus)';
    const enviarProv = async() => {
        const sendindg = async() => {
            await req.body.proveedores.map(async value => {
            const insertPdPv = await sequelize.query(
                `${insert3} ${valuesInsertPdPv}`,
                {
                replacements:{
                    prodId: lastId,
                    provId: value.provider_id,
                    prodStatus: 1,
                }
            });
        })}

        await sendindg();
        res.send('Finalizado');
    }
    enviarProv();    
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

userCrtl.getAllProviders = async(req,res)=>{
    const select = 'Select p.provider_id, p.provider_name';
    const from = 'from providers p'

    const result = await sequelize.query(
        `${select} ${from}`,
        {
            type: QueryTypes.SELECT,
        }
    );

    res.json(result);
}

//export module
module.exports = userCrtl;