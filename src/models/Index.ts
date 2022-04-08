import mongoose from 'mongoose';

import User from './user';
import Sensor from './sensor';
import Actuator from './actuator';
import { load } from 'ts-dotenv';
const env = load({
  DATABASE_URL: String,
  SECRET_KEY: String
});

const connectDb = () => {
  return mongoose.connect(env.DATABASE_URL);
};

const models = { User, Sensor, Actuator };

export { connectDb };

export default models;