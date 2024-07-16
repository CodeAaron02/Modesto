const express = require("express");
const router = express.Router();
const Reservation = require("./models");

// Get all booked dates
router.get("/booked-dates", async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    const bookedDates = reservations.map((reservation) => reservation.date);
    res.json(bookedDates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booked dates" });
  }
});

// Add a new reservation
router.post("/submit-reservation", async (req, res) => {
  const { name, email, phone, package, date } = req.body;
  const reservation = new Reservation({
    name,
    email,
    phone,
    package,
    date,
  });

  try {
    await reservation.save();
    res.status(201).json({ message: "Reservation created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation" });
  }
});

// Handle payment (dummy endpoint)
router.post("/process-payment", (req, res) => {
  // Payment processing logic here
  res.status(200).json({ message: "Payment processed successfully" });
});

module.exports = router;
