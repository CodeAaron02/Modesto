//  mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/

// mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/

const mongoose = require ("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/Modesto")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("error");
  });

const modSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("mod", modSchema);
