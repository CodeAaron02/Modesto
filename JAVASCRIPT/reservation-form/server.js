const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Handle the form submission via POST request
app.post("/submit-reservation", (req, res) => {
  const { name, email, phone, package, date } = req.body;

  console.log("Received form data:", req.body);

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "delarocaaaron@gmail.com",
      pass: "Zerotwo@02", // Use an App Password if 2-Step Verification is enabled
    },
  });

  // Define email content
  let mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient-email@gmail.com",
    subject: "New Reservation Request",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPackage: ${package}\nDate: ${date}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
      return res
        .status(500)
        .json({ message: "Error sending email: " + error.message });
    }
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Reservation request sent successfully!" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
