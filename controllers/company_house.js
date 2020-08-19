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