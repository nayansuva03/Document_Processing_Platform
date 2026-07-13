import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//user ni 2 kodi ni privecy policy.
//pasi kari ly🥱
userSchema.pre('save', async function (next) {
    
})

export default mongoose.model('User', userSchema);