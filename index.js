const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const db = require("./db");

const app = express();

app.use(session({
  secret: 'ESTO ES SECRETO',
  resave: true,
  saveUninitialized: true
}))

const PORT = process.env.PORT || 3000;

//connect to database
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  req.session.user_id = "user Session"
  res.send(req.session.user_id);
});

// verification Code route
app.use("/api/verificationcode", require("./routes/verificationCode"));

//users routes
app.use("/api/users", require("./routes/users"))

/*app.use('/api/users/', function (req, res, next) {
  next()
})*/
