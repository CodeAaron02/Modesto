//  mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/

// mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/

const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("error");
  });

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("reservation", reservationSchema);

data = {
  name: "justin",
};

collection.insertMany([data]);
