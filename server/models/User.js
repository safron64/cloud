import mongoose from 'mongoose'
const { Schema, Types } = mongoose

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	diskSpace: { type: Number, default: 1024 ** 3 * 10 },
	usedSpace: { type: Number, default: 0 },
	avatar: { type: String },
	files: { type: Types.ObjectId, ref: 'file' },
})

const User = mongoose.model('User', UserSchema)

export default User
