import mongoose from 'mongoose';

import User from './user';
import Sensor from './sensor';
import Actuator from './actuator';

const connectDb = () => {
  return mongoose.connect("mongodb+srv://root:kmjTP8QmYSKRQX6Z@webservice.wqbjm.mongodb.net/webservice?retryWrites=true&w=majority");
};

const models = { User, Sensor, Actuator };

export { connectDb };

export default models;