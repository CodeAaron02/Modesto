const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // You can use other services like 'Yahoo', 'Outlook', etc.
    auth: {
      user: "delarocaaaron@gmail.com", // Replace with your email
      pass: "Zerotwo@02", // Replace with your email password
    },
  });

  const mailOptions = {
    from: email,
    to: "delarocaaaron@gmail.com", // Replace with the admin email
    subject: `New message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Message sent successfully");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
