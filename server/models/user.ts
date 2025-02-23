import mongoose from 'mongoose';
import Nationality from '../enums/nationality.js';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  age: {
    type: Number,
  },
  nationality: { 
    type: String,
    enum: Object.values(Nationality) 
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
