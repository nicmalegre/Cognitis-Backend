const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const sendridTransport = require("nodemailer-sendgrid-transport");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "API_KEY",
    },
  })
);

app.get("/", function (req, res) {
  res.send("Hello Cognities!");
});

app.post("/api/verificationcode", function (req, res) {
  //abcdefghijklmnopqrstuvwxyz

  let code = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;

  for (var i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  //send email
  try {
    transporter.sendMail({
      to: req.body.mail,
      from: "sebasrz.rcia@gmail.com",
      subject: "Verification Code",
      html: `<div> <h2>Your verification code is: ${code}</h2> </div>`,
    });
  } catch (error) {
    console.log("Error try send email", error);
  }

  res.json({
    verificationCode: code,
  });
});
