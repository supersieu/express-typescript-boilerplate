import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['TEMPERATURE', 'HUMIDITY', 'BARO', 'PROXIMITY']
        },
        designation: String,
        rawValue: Number,
        value:Number,
    }
);

const Sensor = mongoose.model('Sensor', sensorSchema);

export default Sensor;