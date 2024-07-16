//  mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Replace with your MongoDB Atlas connection string
const dbUri = "mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/";

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  package: String,
  date: String,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

app.use(bodyParser.json());

app.post("/submit-reservation", async (req, res) => {
  const { name, email, phone, package, date } = req.body;

  const newReservation = new Reservation({
    name,
    email,
    phone,
    package,
    date,
  });

  try {
    await newReservation.save();
    res.status(201).send("Reservation saved successfully");
  } catch (error) {
    res.status(500).send("Error saving reservation: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


use("mongodbVSCodePlaygroundDB");

// Insert a few documents into the sales collection.
db.getCollection("reservation").insertMany([
  {
    name: "Justin",
    email: "delaroca02@gmail.com",
    phone_number: "09618816823",
    packages: "Day Tour Weekdays",
    date: new Date("2014-03-01T08:00:00Z"),
  },
  {
    name: "Justin",
    email: "delaroca02@gmail.com",
    phone_number: "09618816823",
    packages: "Day Tour Weekdays",
    date: new Date("2014-03-01T09:00:00Z"),
  },
  {
    item: "xyz",
    price: 5,
    quantity: 10,
    date: new Date("2014-03-15T09:00:00Z"),
  },
  {
    item: "xyz",
    price: 5,
    quantity: 20,
    date: new Date("2014-04-04T11:21:39.736Z"),
  },
  {
    item: "abc",
    price: 10,
    quantity: 10,
    date: new Date("2014-04-04T21:23:13.331Z"),
  },
  {
    item: "def",
    price: 7.5,
    quantity: 5,
    date: new Date("2015-06-04T05:08:13Z"),
  },
  {
    item: "def",
    price: 7.5,
    quantity: 10,
    date: new Date("2015-09-10T08:43:00Z"),
  },
  {
    item: "abc",
    price: 10,
    quantity: 5,
    date: new Date("2016-02-06T20:20:13Z"),
  },
]);