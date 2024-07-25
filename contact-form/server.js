const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static("public"));

// Route to handle form submission
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Set up Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: " ", // Your Gmail address
      pass: "", // Your Gmail password or app password
    },
  });

  // Email options
  let mailOptions = {
    from: email,
    to: "delarocaaaron@gmail.com",
    subject: `Contact form submission from ${name}`,
    text: message,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
