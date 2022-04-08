import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["TEMPERATURE", "HUMIDITY", "BARO", "PROXIMITY"],
  },
  designation: String,
  rawValue: Number,
  value: String,
});

sensorSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Sensor = mongoose.model("Sensor", sensorSchema);

export default Sensor;
