const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");


//Initialization
const db = require("./db");
const app = express();


//settings
app.set('port', process.env.PORT || 3000);


//middlerwares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

//company routes
app.use("/api/company", require("./routes/company"))

//branch office house routes
app.use("/api/branchofficehouse", require("./routes/branchofficehouse"))

//head_house routes
app.use("/api/head_house", require("./routes/head_house"))

//products routes
app.use("/api/products", require("./routes/products"))


//starting the app
app.listen(app.get('port'), () => {
  console.log('Running on port',app.get('port'));
});
/*app.use('/api/users/', function (req, res, next) {
  next()
})*/
