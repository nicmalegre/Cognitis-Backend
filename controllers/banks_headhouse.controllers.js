const bank_headhouseCrtl = {};
const banks_head_house = require("../models/banks_head_house");

//POST ADD NEW BANK TO HEAD_HOSE
bank_headhouseCrtl.postBanks_headhouse = async(req, res, head_id) => {
    console.log("este es el req",req.body.bank_head_house_name)
  const Newbank_headhouse = banks_head_house.build({
    bank_head_house_name: req.body.bank_head_house_name,
    bank_head_house_account: req.body.ank_head_house_account,
    bank_head_house_alias: req.body.bank_head_house_alias,
    bank_head_house_cbu: req.body.bank_head_house_cbu,
    head_id: head_id,
  });
    await Newbank_headhouse.save();
    res.send({
      message: "Registro guardado de bak_head_house correctamente",
    });
  /*} catch (error) {
    res.send({
      message: "Error al intentar añadir el bank_head_house",
      error: error,
    });
  }*/
};

//export module
module.exports = bank_headhouseCrtl;
