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
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://delaroca02:zerotwo02@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemSchema);

const createNewItem = async () => {
  const newItem = new Item({ name: "New Item" });
  try {
    await newItem.save();
    console.log("Item saved successfully");
  } catch (err) {
    console.error("Save error:", err);
  }
};

createNewItem();

// Select the database to use.
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
    name: "Aaron",
    email: "aaron@gmail.com",
    phone_number: "09618816823",
    packages: "Overnight",
    date: new Date("2014-03-01T09:00:00Z"),
  },
]);
