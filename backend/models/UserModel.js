import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	isSuperuser: {
		type: Boolean,
		required: true,
		default: false,
	},
});

UserSchema.method("toJSON", function () {
	const { _v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});
export default mongoose.model("Users", UserSchema);
