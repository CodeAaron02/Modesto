const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Handle the form submission
app.post("/submit-reservation", (req, res) => {
  const { name, email, phone, package, date } = req.body;

  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-app-password", // Use an App Password if 2-Step Verification is enabled
    },
  });

  // Email content
  let mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient-email@gmail.com",
    subject: "New Reservation Request",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPackage: ${package}\nDate: ${date}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email: " + error.message);
    }
    res.status(200).send("Reservation request sent successfully!");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
