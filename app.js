const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const sendGridOptions = require("./config");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
  let transporter = nodemailer.createTransport(sgTransport(sendGridOptions));
  let mailOptions = {
    from: '"Nick Foden" <nick@madeupaddress.com>',
    to: "fbideputydirectorcarterperson@aol.com, johnmcclane@yahoo.com", // Update this to be your recepient or recipients
    subject: "Node Contact Request", // Subject line of email
    text: "Hello world?", // plain text body
    html: output // html body of email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Email has been sent" });
  });
});

app.listen(3000, () => console.log("server started"));
