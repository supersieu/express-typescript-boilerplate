import mongoose from 'mongoose';

const actuatorSchema = new mongoose.Schema(
    {
        type: {
            type : String,
            enum: ['BLINDS', 'LIGHT'],
        },
        designation: String,
        state: Boolean
    }
);

const Actuator = mongoose.model('Actuator', actuatorSchema);

export default Actuator;