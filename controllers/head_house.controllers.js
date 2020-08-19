const head_houseCrtl = {};
const head_house = require('../models/head_house');
const bank = require('../models/banks_head_house');

//obtine todas las notas
head_houseCrtl.postHead_house= (req,res) => {
    //Check if the email exists in the DB
  head_house.findOne({
    where: {
        head_cuit : req.body.cuil,
    },
  })
    .then(async(current_headhouse) => {
      //In case the email does not exist in the DB, the password is encrypted
      if (!current_headhouse) {
        const Newhead_house = head_house.build({
          head_name: req.body.name,
          head_cuit: req.body.cuil,
          head_business_name: req.body.razonsocial,
          head_country: req.body.pais,
          head_email: req.body.email,
          head_tel: req.body.telefono,
          head_fax:req.body.fax,
          bank_id: req.body.id
        });
        const Newbank = bank.build({
            bank_name: req.body.namebank,
            bank_acount:req.body.acount,
            bank_alias: req.body.alias  
        })
        Newuser.save();
        Newbank.save(),
        res.send("head house register");
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
//export module
module.exports = head_houseCrtl;