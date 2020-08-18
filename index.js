const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

//Initialization
const db = require("./db");
const app = express();


//settings
app.set('port', process.env.PORT || 3000);


//middlerwares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "API_KEY",
    },
  })
);

//Routes
app.get("/", function (req, res) {
  res.send("Hello Cognititiviisssss");
  req.session.user_id = "user Session"
  res.send(req.session.user_id);
});

// verification Code route
app.use("/api/verificationcode", require("./routes/verificationCode"));

//users routes
app.use("/api/users", require("./routes/users"))


//starting the app
app.listen(app.get('port'), () => {
  console.log('Running on port',app.get('port'));
});
/*app.use('/api/users/', function (req, res, next) {
  next()
})*/
