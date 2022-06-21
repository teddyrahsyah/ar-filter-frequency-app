import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
	accessToken: {
		type: String,
		max: 255,
	},
});

TokenSchema.method("toJSON", function () {
	const { _v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

export default mongoose.model("Tokens", TokenSchema);