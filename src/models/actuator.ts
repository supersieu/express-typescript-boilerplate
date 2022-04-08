import mongoose from "mongoose";

const actuatorSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["BLINDS", "LIGHT"],
  },
  designation: String,
  state: Boolean,
});

actuatorSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Actuator = mongoose.model("Actuator", actuatorSchema);

export default Actuator;
