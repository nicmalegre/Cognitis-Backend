const head_houseCrtl = {};
const head_house = require("../models/head_house");
const banks_head_house = require("../models/banks_head_house");
const { head } = require("../routes/head_house");
//const {postBanks_headhouse} = require("./banks_headhouse.controllers");

//CREATE A NEW HEAD_HOUSE
head_houseCrtl.postHead_house = async(req, res) => {
  //Check if the email exists in the DB
  /*head_house
    .findOne({
      where: {
        head_cuit: req.body.head_cuit,
      },
    })
    .then(async (register_headhouse) => {
      if (!register_headhouse) {*/
    try{
        const Newhead_house = head_house.build({
          head_name: req.body.head_name,
          head_cuit: req.body.head_cuit,
          head_business_name: req.body.head_business_name,
          head_country: req.body.head_country,
          head_email: req.body.head_email,
          head_tel: req.body.head_tel,
          head_fax: req.body.head_fax,
        });
        const result = await Newhead_house.save();
        let head_id = result.dataValues.head_id;
        const Newbank_head_house = banks_head_house.build({
          bank_head_house_name: req.body.bank_head_house_name,
          bank_head_house_account: req.body.bank_head_house_account,
          bank_head_house_alias: req.body.bank_head_house_alias,
          bank_head_house_cbu: req.body.bank_head_house_cbu,
          head_id,
        });
        await Newbank_head_house.save();
        res.json(head_id);
      /*}
      // If cuil exists in BD, please reply error message
      else {
        res.json({ error: "el cuil ya existe" });
      }*/
    }
    catch(error){
      res.send({
        message: "Error al intentar añadir head_house",
        error: error,
      });
    };
};
/*
//GET ALL THE USERS
head_houseCrtl.getUsers = async (req, res) => {
  const users = await user.findAll(); //devuelve todos los usuarios
  res.json({users});
};
*/
//export module
module.exports = head_houseCrtl;
