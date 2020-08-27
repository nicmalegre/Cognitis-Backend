const industry = require('./../models/industry')

exports.getIndustries = async (req, res) => {
    const industries = await industry.findAll({
        where: {
            industry_status: 1
        }
    })

    res.send(industries)
}