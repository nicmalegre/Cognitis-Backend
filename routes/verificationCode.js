const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let code = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;

  for (var i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  //expire at
  let currentTime = new Date();
  let thirtyMinutesLater = new Date(currentTime.getTime() + 30 * 60 * 1000);

  //send email
  try {
    transporter.sendMail({
      to: req.body.mail,
      from: "sebasrz.rcia@gmail.com",
      subject: "Verification Code",
      html: `<div> 
                <h2>Your verification code is: ${code}</h2> 
                <p>This code expire at ${thirtyMinutesLater.getHours()}:${thirtyMinutesLater.getMinutes()} from ${thirtyMinutesLater.toDateString()}</p>
              </div>`,
    });
  } catch (error) {
    console.log("Error try send email", error);
  }

  res.json({
    verificationCode: code,
    expireAt: thirtyMinutesLater,
  });
});

module.exports = router;
