const branch_office_house = require("../models/branch_office_house");
const banks_branch_office = require("../models/banks_branch_office");
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

// create a new office house
exports.createBranchOfficeHouse = async (req, res) => {
  const new_branch_office = branch_office_house.create(
    {
      branch_office_name: req.body.name,
      branch_office_cuit: req.body.cuit,
      branch_office_business_name: req.body.business_name,
      head_country: req.body.country,
      branch_office_email: req.body.email,
      branch_tel: req.body.tel,
      branch_office_fax: req.body.fax,
      branch_office_address: req.body.address,
      company_house_id: req.body.company_id,
      bank_branch_office: {
        bank_branch_office_name: req.body.bank_name,
        bank_branch_office_account: req.body.bank_account,
        bank_branch_office_alias: req.body.bank_alias,
        bank_branch_office_cbu: req.body.bank_cbu,
      },
    },
    {
      include: "bank_branch_office",
    }
  );

  if (new_branch_office) {
    res.send({
      message: "datos guardados correctamente",
    });
  } else {
    res.send({
      message: "No se pudo guardar los datos",
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
        branch_tel: req.body.tel,
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
