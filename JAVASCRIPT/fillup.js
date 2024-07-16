const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/reservations", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  package: String,
  date: String,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

app.post("/api/reservations", (req, res) => {
  const reservation = new Reservation(req.body);
  reservation.save((err) => {
    if (err) {
      res.status(500).send("Error saving reservation");
    } else {
      res.status(200).send("Reservation saved");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
