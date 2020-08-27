const branch_office_house = require("../models/branch_office_house");
const banks_branch_office = require("../models/banks_branch_office");
const productModel = require("../models/products")

const db = require("../db");

// get all branch office house
exports.getAllBranchOffice = async (req, res) => {
  const branchOffices = await branch_office_house.findAll({
    where: {
      branch_office_status: 1,
    },
  });

  res.send(branchOffices);
};


//GET A BRANCH_OFFICE BY ID
exports.getBranchOfficeById = async (req, res) => {
  try{
  const branchoffice = await branch_office_house.findOne({
    where: {
      branch_office_id: req.params.branchoffice_id,
      branch_office_status:1
    },
    include: ['bankbranch']
  })

  if(branchoffice){
    res.send(branchoffice)
  }else{
    res.send('no se encontro una sucursal con ese id')
  }}
  catch (e){
    res.send("Algo salio mal:"+ e)
  }
}


// create a new office house
exports.createBranchOfficeHouse = async (req, res) => {
  
  try{
  const tel = `${req.body.country_code}-${req.body.area_code}-${req.body.tel}`;  
  const new_branch_office = await branch_office_house.create(
    {
      branch_office_name: req.body.name,
      branch_office_cuit: req.body.cuit,
      branch_office_business_name: req.body.business_name,
      head_country: req.body.country,
      branch_office_email: req.body.email,
      branch_tel: tel,
      branch_office_fax: req.body.fax,
      branch_office_address: req.body.address,
      company_house_id: req.body.company_id,
      bankbranch: {
        bank_branch_office_name: req.body.bank_name,
        bank_branch_office_account: req.body.bank_account,
        bank_branch_office_alias: req.body.bank_alias,
        bank_branch_office_cbu: req.body.bank_cbu,
      },
    },
    {
      include: ['bankbranch']
    }
  );

  if (new_branch_office) {
    res.send({
      message: "datos guardados correctamente",
    });
  }}
   catch (error) {
    res.json({
      //message: "No se pudo guardar los datos",
      error: error
    });
  }
};

//get all branch office house by a company
exports.getBranchOfficeByCompany = async (req, res) => {
  const branchOffices = await branch_office_house.findAll({
    where: {
      company_house_id: req.body.company_id,
      branch_office_status: 1
    },
  });

  res.send(branchOffices);
};

//update a branch office house
exports.updateBranchOffice = async (req, res) => {
  
  let branchOffice = await branch_office_house.findOne({
    where: {
      branch_office_id: req.body.id,
    },
  });

  let bankBranchOffice = await banks_branch_office.findOne({
    where: {
      branch_office_id: req.body.id
    }
  })

  if (branchOffice && bankBranchOffice) {
    const updateBranchOffice = await branchOffice.update(
      {
        branch_office_name: req.body.name,
        branch_office_cuit: req.body.cuit,
        branch_office_business_name: req.body.business_name,
        head_country: req.body.country,
        branch_office_email: req.body.email,
        branch_tel: `${req.body.country_code}-${req.body.area_code}-${req.body.branch_tel}`,
        branch_office_fax: req.body.fax,
        branch_office_address: req.body.address,
      },
    );

    const updateBankBranchOffice = await bankBranchOffice.update({
      bank_branch_office_name: req.body.bank_name,
      bank_branch_office_account: req.body.bank_account,
      bank_branch_office_alias: req.body.bank_alias,
      bank_branch_office_cbu: req.body.bank_cbu
    })

    if (updateBranchOffice && updateBankBranchOffice) {
      res.send({
        message: "editado correctamente",
      });
    } else {
      res.send({
        message: "ocurrio un error al editar",
      });
    }
  } else {
    res.send({
      message: "ocurrio un error al editar",
    });
  }
};

//delete a branch office house by id
exports.deleteBranchOffice = async (req, res) => {
  let branchOffice = await branch_office_house.findOne({
    where: {
      branch_office_id: req.body.id,
    },
  });

  if (branchOffice) {
    branchOffice.update({
      branch_office_status: 0,
    });

    res.send({
      message: "Sucursal dada de baja correctamente",
    });
  }

  res.send("Error al intentar dar de baja");
};

exports.getProducts = async (req, res) => {
  let productResults = await productModel.findAll({
    where: {
      product_branch_office_id: req.params.id
    }
  })

  res.send(productResults)
}

exports.getProduct = async (req, res) => {
  let productResults = await productModel.findAll({
    where: {
      product_branch_office_id: req.params.id_sucursal,
      product_id: req.params.id_product
    }
  })

  res.send(productResults)
}
