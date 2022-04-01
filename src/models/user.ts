import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: String,
        password: {
          type: String,
          select: false
        },
        username: {
            type: String,
            unique: true,
            required: true
          },
    }
);

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
      username: login,
    });
  
    if (!user) {
      user = await this.findOne({ email: login });
    }
  
    return user;
  };

const User = mongoose.model('User', userSchema);

export default User;