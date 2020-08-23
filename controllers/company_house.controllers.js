const company_house = require("../models/company_house");
const banks_company_house = require("../models/banks_company_house");
const { head } = require("../routes/users");

//GET ALL COMPANIES
exports.getAllCompanies = async (req, res) => {
  const companies = await company_house.findAll();
  res.send(companies);
};

//CREATE NEW COMPANY FOR A HEAD_HOUSE
exports.createCompany = (req, res) => {
  company_house
    .findOne({
      where: {
        company_cuit: req.body.company_cuit,
      },
    })
    .then(async (register_company) => {
      if (!register_company) {
        //const { head_house_id } = req.body;
        const {
          company_name,
          company_cuit,
          company_business_name,
          company_country,
          company_email,
          company_tel,
          company_fax,
          head_house_id,
          company_house_industry_id,
          bank_company_name,
          bank_company_account,
          bank_company_alias,
          bank_company_cbu,
        } = req.body;
        const Newcompany = company_house.build({
          company_name,
          company_cuit,
          company_business_name,
          company_country,
          company_email,
          company_tel,
          company_fax,
          company_house_industry_id,
          head_house_id,
        });
        const result = await Newcompany.save();
        let company_id = result.dataValues.company_id;
        const Newbank_head_house = banks_company_house.build({
          bank_company_name,
          bank_company_account,
          bank_company_alias,
          bank_company_cbu,
          company_id,
        });
        await Newbank_head_house.save();
        res.send({
          message: "Compañia registrada correctamente",
        });
      }
      // If cuil exists in BD, please reply error message
      else {
        res.json({ error: "Compañia ya registrada" });
      }
    })
    .catch((error) => {
      res.send({
        message: "Error al intentar crear un compañia",
        error: error,
      });
    });
};

//FIND ALL COMPANY ASSOCIETE WITH AN ID THE HEAD_HOUSE
exports.getCompanies_headhouse = async (req, res) => {
  const { head_house_id } = req.params;
  //busca todas las compañias asociado a una head_house
  try {
    const companies_house = await company_house.findAll({
      attributes: [
        "company_id",
        "company_name",
        "company_cuit",
        "company_business_name",
        "company_country",
      ],
      where: {
        //en el where es lo mismo que head_house_id : head_house_id
        head_house_id,
      },
    });
    res.json({ companies_house });
  } catch (error) {
    res.send({
      message:
        "Error al intentar obtener todas las company asociadas con una head_house",
      error: error,
    });
  }
};

/*
//UPDATE ONE COMPANY HOUSE ASSOCIETE WITH AN ID THE COMPANY_HOUSE_ID
exports.putCompany = async (req, res) => {
  const { company_id } = req.params;
  try {
    const current_company_house = await company_house.findOne({
      where: {
        //en el where es lo mismo que head_house_id : head_house_id
        company_id,
      },
    });
    if (current_company_house) {
      //console.log(current_company_house);
      const {
        company_name,
        company_cuit,
        company_business_name,
        company_country,
        company_email,
        company_tel,
        company_fax,
        bank_company_name,
        bank_company_account,
        bank_company_alias,
        bank_company_cbu,
      } = req.body;
      const editCompany_house = await company_house.update(
        {
          //esto es lo mismo que colocar company_name:company_name,
          company_name,
          company_cuit,
          company_business_name,
          company_country,
          company_email,
          company_tel,
          company_fax,
          banks_company_house:[{
            bank_company_name,
            bank_company_account,
            bank_company_alias,
            bank_company_cbu,
          }],
        },
        {
          include: [ banks_company_house ],
          where: { company_id },
        }
      );
      res.json({ editCompany_house });
    } else {
      res.json({ error: "la company no existe en la BD" });
    }
  } catch (error) {
    res.json({
      message: "Error al editar los datos de la company",
      error: error,
    });
  }
};
*/

//ROUTE TO UPDATE THE DATA OF THE SPECIFIC COMPANY
exports.updateCompanyhouse = async (req, res) => {
  const { company_id } = req.params;
  let companyHouse = await company_house.findOne({
    where: {
      company_id,
    },
  });

  let bankCompanyHouse = await banks_company_house.findOne({
    where: {
      company_id,
    },
  });

  if (companyHouse && bankCompanyHouse) {
    const {
      name,
      cuit,
      business_name,
      country,
      email,
      tel,
      fax,
      bank_company_name,
      bank_company_account,
      bank_company_alias,
      bank_company_cbu,
    } = req.body;
    const updateCompanyHouse = await companyHouse.update({
      company_name: name,
      company_cuit: cuit,
      company_business_name: business_name,
      company_country: country,
      company_email: email,
      company_tel: tel,
      company_fax: fax,
    });

    const updateBankCompanyHouse = await bankCompanyHouse.update({
      bank_company_name,
      bank_company_account,
      bank_company_alias,
      bank_company_cbu,
    });

    if (updateCompanyHouse && updateBankCompanyHouse) {
      res.send({
        message: "compañia editada correctamente",
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

//DELETE (LOGICAL) ONE COMPANY ASSOCIATE WITH ONE HEAD_OFFICE
//delete a branch office house by id
exports.deleteCompany = async (req, res) => {
  let company = await company_house.findOne({
    where: {
      company_id: req.body.company_id,
    },
  });

  if (company) {
    company.update({
      company_status: 0,
    });

    res.send({
      message: "Company dada de baja correctamente",
    });
  }

  res.send("Error al intentar dar de baja");
};
