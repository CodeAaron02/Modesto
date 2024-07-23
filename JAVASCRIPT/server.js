const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit-reservation", (req, res) => {
  const { name, email, phone, package, date } = req.body;

  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "delarocaaaron02@gmail.com",
      pass: "Zerotwo@02",
    },
  });

  // Email content
  let mailOptions = {
    from: "delarocaaaron@gmail.com",
    to: "delarocaaaron@gmail.com",
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reservation-form");

  form.onsubmit = function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Form submission logic
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch(form.action, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((result) => {
        alert("Reservation request sent successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
});
