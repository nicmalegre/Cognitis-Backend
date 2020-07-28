const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const db = require("./db");

const PORT = process.env.PORT || 3000;

//connect to database
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();
app.use(cors());

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

// verification Code route
app.use("/api/verificationcode", require("./routes/verificationCode"));

//users routes
app.use("/api/users", require("./routes/users"))
