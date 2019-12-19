import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: String,
  googleIdCaptured: {
    type: Date,
    default: Date.now,
  },
  name: String,
});

export default mongoose.model('Users', UserSchema);
