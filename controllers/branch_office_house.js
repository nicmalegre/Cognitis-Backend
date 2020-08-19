const branch_office_house = require("../models/branch_office_house");
const db = require("../db");

// get all branch office house
exports.getAllBranchOffice = async (req, res) => {
  const branchOffices = await branch_office_house.findAll();

  res.send(branchOffices);
};

// create a new office house
exports.createBranchOfficeHouse = async (req, res) => {
  const branch_office = branch_office_house.build({
    branch_office_name: req.body.name,
    branch_office_cuit: req.body.cuit,
    branch_office_business_name: req.body.business_name,
    head_country: req.body.country,
    branch_office_email: req.body.email,
    branch_tel: req.body.tel,
    branch_office_fax: req.body.fax,
    branch_office_address: req.body.address,
    company_house_id: req.body.company_id,
    bank_branch_office_id: req.body.bank_id,
  });

  if (branch_office.save()) {
    res.send({
      message: "datos guardados correctamente",
    });
  } else {
    res.send({
      message: "No se údo guardar los datos",
    });
  }
};

//get all branch office house by a company
exports.getBranchOfficeByCompany = async (req, res) => {
  const branchOffices = await branch_office_house.findAll({
    where: {
      company_house_id: req.body.company_id,
    },
  });

  res.send(branchOffices);
};

exports.updateBranchOffice = async (req, res) => {
  let branchOffice = await branch_office_house.findOne({
    where: {
      branch_office_id: req.body.id,
    },
  });


  if (branchOffice) {
    branchOffice.update({
      branch_office_name: req.body.name,
      branch_office_cuit: req.body.cuit,
      branch_office_business_name: req.body.business_name,
      head_country: req.body.country,
      branch_office_email: req.body.email,
      branch_tel: req.body.tel,
      branch_office_fax: req.body.fax,
      branch_office_address: req.body.address,
    });

    res.send({
      message: "actualizado correctamente",
    });
  } else {
    res.send({
      message: "no se pudo actualizar",
    });
  }
};
