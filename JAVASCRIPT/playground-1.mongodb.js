/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
//

//  mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/

// mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/mongodbVSCodePlaygroundDB"
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("error");
  });

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phonenumber: {
    type: Number,
  },
  package: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const collection = new mongoose.model("reservation", reservationSchema);

data = {
  name: "Aaron Justin",
  email: "delaroca02@gmail.com",
  phonenumber: "09618816823",
  package: "Overnight",
  date: new Date("7-23-2024"),
};

collection.insertMany([data]);
