const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  package: String,
  date: String,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
