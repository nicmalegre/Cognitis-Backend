const express = require("express");
const router = express.Router();
const User = require("../models/User");
const db = require("../db");
const session = require("express-session");

router.post("/saveuser", (req, res) => {
  const user = User.build({
    product: req.body.product,
    mail: req.body.mail,
    password: req.body.password,
    country: req.body.country,
  });
  user.save();
  res.send("Usuario guardado en la base de datos");
});

router.post("/emailverification", async (req, res) => {
  const user = await User.findOne({
    where: {
      mail: req.body.mail,
    },
  });

  if (user) {
    console.log("already used");
    console.log(user);
    res.json({
      alreadyUsed: true,
    });
  } else {
    console.log("not used yet");
    res.json({
      alreadyUsed: false,
    });
  }
});

router.post("/senduserinvitation", (req, res) => {
  const user = User.build({});

  try {
    transporter.sendMail({
      to: req.body.mail,
      from: "sebasrz.rcia@gmail.com",
      subject: "Verification Code",
      html: `<div> 
                <h2>HI ${code}</h2> 
                <p>This code expire at ${thirtyMinutesLater.getHours()}:${thirtyMinutesLater.getMinutes()} from ${thirtyMinutesLater.toDateString()}</p>
              </div>`,
    });
  } catch (error) {
    console.log("Error to try send email", error);
  }
});

module.exports = router;
