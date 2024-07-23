//  mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/

// mongodb+srv://delaroca02:zerotwo02@modesto.rrffudr.mongodb.net/

const mongoose = required("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Modesto")
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
