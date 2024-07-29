const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Handle the form submission
app.post("/submit-reservation", (req, res) => {
  const { name, email, phone, package, date } = req.body;

  console.log("Received form data:", req.body);

  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "delarocaaaron02@gmail.com",
      pass: "lckz jtsc nuac pngh", // Use an App Password if 2-Step Verification is enabled
    },
  });

  // Email content
  let mailOptions = {
    from: "delarocaaaron02@gmail.com",
    to: email,
    subject: "New Reservation Request",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPackage: ${package}\nDate: ${date}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
      return res.status(500).send("Error sending email: " + error.message);
    }
    console.log("Email sent:", info.response);
    res.status(200).send("Reservation request sent successfully!");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
