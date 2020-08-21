const company_house = require('../models/company_house')
const { head } = require('../routes/users')

exports.getAllCompanies = async (req, res) => {
    const companies = await company_house.findAll()
    res.send(companies)
}

exports.createCompany = (req, res) => {
    const company = company_house.build({
        company_name: req.body.name,
        company_cuit: req.body.cuit,
        company_business_name: req.body.business_name,
        company_country: req.body.country,
        company_email: req.body.email,
        company_tel: req.body.tel,
        company_fax: req.body.fax,
        company_house_industry_id: req.body.industry_id,
        head_house_id: req.body.head_house_id,
        bank_company_house_id: req.body.bank_id
    })

    try {
        company.save()

        res.send({
            message: 'Registro guardado correctamente'
        })

        /* console.log('datos recibidos', req.body)
        res.send(company) */
    } catch (error) {
        res.send({
            message: 'Error al intentar crear a company house',
            error: error
        })
    }
}

//FIND ALL COMPANY ASSOCIETE WITH AN ID THE HEAD_HOUSE
exports.getCompanies_headhouse= async(req,res) => {
    const {head_house_id} = req.params;
    //busca todas las compañias asociado a una head_house
    try{
    const companies_house = await company_house.findAll({
        attributes: ['company_id','company_name','company_cuit','company_business_name','company_country'],
        where: {
            //en el where es lo mismo que head_house_id : head_house_id
            head_house_id
        }
    })
    res.json({companies_house})
    }
    catch(error){
        res.send({
            message: 'Error al intentar obtener todas las company asociadas con una head_house',
            error: error
        })
    }
}

//DELETE ONE COMPANY ASSOCIATE WITH ONE HEAD_HOUSE
exports.deleteCompany = async (req, res) => {
    const company = await company_house.findAll({
      where: {
        company_id: req.body.company_id,
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