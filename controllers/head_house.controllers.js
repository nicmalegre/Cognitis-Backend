const head_houseCrtl = {};
const head_house = require('../models/head_house');
const bank = require('../models/banks_head_house');


head_houseCrtl.postHead_house= (req,res) => {
    //Check if the email exists in the DB
  head_house.findOne({
    where: {
        head_cuit : req.body.head_cuit,
    },
  })
    .then(async(current_headhouse) => {
      //In case the email does not exist in the DB, the password is encrypted
      if (!current_headhouse) {
        const Newhead_house = head_house.build({
          head_name: req.body.head_name,
          head_cuit: req.body.head_cuit,
          head_business_name: req.body.head_business_name,
          head_country: req.body.head_country,
          head_email: req.body.head_email,
          head_tel: req.body.head_tel,
          head_fax:req.body.head_fax,
        });
        const result = await Newhead_house.save();
        result.dataValues.head_id;
      }
      // If email exists in BD, please reply error message
      else {
        res.json({ error: "la compañia matriz ya fue registrada" });
      }
    })
    .catch((err) => {
      res.send("error:" + err);
    });
  }

  /*head_houseCrtl.getCompanies= (req,res) => {*/

    //export module
module.exports = head_houseCrtl;