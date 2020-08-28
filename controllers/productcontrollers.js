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


// //FUNCTION FOR PAGINATION WHEN WE GET ALL THE PRODUCTS
// const getPagination = (page, size) => { //Esta funcion controla si los parametros page y size fueron pasados
//                                         //en el caso de que no existan, le establece un valor por defecto
//     const limit = size ? +size : 10;//Si existe el parametro le pongo el valor del parametro y sino le pongo 0
//     const offset = page ? page * limit : 0;//Si existe page se setea page*limit y sino 0
//     return { limit, offset };
// };

// const getPagingData = (data, page, limit) => {//Necesitamos devolver total items, los items, total de paginas y pagina actual
//                                             //Esta funcion se encarga de devolver eso
//     const { count: totalProducts, rows: products } = data;
//     const currentPage = page ? +page : 0;
//     const totalPages = Math.ceil(totalProducts / limit);
//     return { totalProducts, products, totalPages, currentPage };
// };

// //GET ALL PRODUCTS WITH PAGINATION
// userCrtl.getProducts= async(req,res) => {
//     const page = parseInt(req.params.page)
//     const size = 10; //This is the same of limit. How many items we want to return for query.
//     const { limit, offset } = getPagination(page, size);

//     product.findAndCountAll({ limit, offset })
//         .then(data => {
//         const response = getPagingData(data, page, limit);
//         res.send(response);
//         })
//         .catch(err => {
//         res.status(500).send({
//             message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//         });
// }


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
    const update = 'update products'
    const set = 'set product_name = :prodName, product_description = :prodDescription,product_brand = :prodBrand, product_type = :prodType, product_is_dollar = :prodIsDollar, product_in_ecommerce = :productEcommerce, product_unit = :productUnit, product_vol = :prodVol, product_package = :prodPackage, product_package_customers = :prodPackageCustomers, product_min_margin = :prodMinMargin, product_max_margin = :prodMaxMargin, product_list_price = :prodListPrice, product_bonification = :prodBonification,product_price_bonification = :prodPriceBonification, product_freight_cost = :prodFreightCost, product_accountant_type = :prodAccountantType, product_accountant_account = :prodAccountantAccount, product_material = :prodMaterial, product_origin = :prodOrigin, product_shipping = :prodShipping, product_warranty = :prodWarranty, product_barcode = :prodBarcode, product_status = :prodStatus, product_maker = :prodMaker, product_country_tax = :prodCountryTax, product_cost_with_tax = :prodCostWTax, category = :cat, product_cost_neto_repo = :prodCostNetoRepo'
    const where = 'where product_id = :prodId';
    const resultUpdate1 = await sequelize.query(
        `${update} ${set} ${where}`,
        {
        replacements:{
            prodName: req.body.product_name,
            prodDescription: req.body.product_description,
            prodBrand: req.body.product_brand,
            prodType: req.body.product_type,
            prodIsDollar: req.body.product_is_dollar,
            productEcommerce: req.body.product_in_ecommerce,
            productUnit: req.body.product_unit,
            prodVol: req.body.product_vol,
            prodPackage: req.body.product_package,
            prodPackageCustomers: req.body.product_package_customers,
            prodMinMargin: req.body.product_min_margin,
            prodMaxMargin: req.body.product_max_margin,
            prodListPrice: req.body.product_list_price,
            prodBonification: req.body.product_bonification,
            prodPriceBonification: req.body.product_price_bonification,
            prodFreightCost: req.body.product_freight_cost,
            prodAccountantType: req.body.product_accountant_type,
            prodAccountantAccount: req.body.product_accountant_account,
            prodMaterial: req.body.product_material,
            prodOrigin: req.body.product_origin,
            prodShipping: req.body.product_shipping,
            prodWarranty: req.body.product_warranty,
            prodBarcode: req.body.product_barcode,
            prodStatus: req.body.product_status,
            prodMaker: req.body.product_maker,
            prodCountryTax: req.body.product_country_tax,
            prodCostWTax: req.body.product_cost_with_tax,
            cat: req.body.category,
            prodCostNetoRepo: req.body.product_cost_neto_repo,
            prodId: id_product,
        },
        type: QueryTypes.UPDATE,
        }
    );

    try{
    if(req.body.nombreIndustria === 'retail'){
    const update2 = 'update products_retail';
    const set2 = 'set product_line = :prodLine, product_seed = :prodSeed, product_service = :prodService, product_serie = :prodSerie, product_NTecnico = :prodNTecnico, product_status = :prodStatus, product_technical_data = :prodTechnicalData, product_model = :prodModel';
    const where2 = 'where product_id = :prodId';

    const updateParticular = await sequelize.query(
        `${update2} ${set2} ${where2}`,
        {
        replacements:{
            prodLine: req.body.product_line,
            prodSeed: req.body.product_seed,
            prodService: req.body.product_service,
            prodSerie: req.body.product_serie,
            prodNTecnico: req.body.product_NTecnico,
            prodStatus: req.body.product_status,
            prodTechnicalData: req.body.product_technical_data,
            prodModel: req.body.product_model,
            prodId: id_product,
        },
        type: QueryTypes.UPDATE,
    }
    )
    }else if(req.body.nombreIndustria === 'indumentary'){
    const update2 = 'update products_indumentary'
    const set2 = 'set product_curve = :prodCurve, product_color = :prodColor, product_season = :prodSeason, product_status = :prodStatus'
    const where2 = 'where product_id = :prodId'
    const updateParticular = await sequelize.query(
        `${update2} ${set2} ${where2}`,
        {
        replacements:{
            prodCurve: req.body.product_curve,
            prodColor: req.body.product_color,
            prodSeason: req.body.product_season,
            prodStatus: req.body.product_status,
            prodId: id_product,
        },
        type: QueryTypes.UPDATE,
    }
    )
    }
    }catch(error){
        console.log(error)
    }
    res.json(resultUpdate1)
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
    const select = 'Select providers.provider_id, providers.provider_name';
    const from = 'from providers'

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