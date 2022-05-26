import mongoose from "mongoose";

const LectureSchema = mongoose.Schema({
	moduleNumber: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
		max: 255,
	},
	title: {
		type: String,
		required: true,
		max: 255,
	},
	description: {
		type: String,
		required: true,
	},
	imageData: {
		data: Buffer,
		contentType: String,
	},
	modelAR: {
		type: String,
		required: true,
		max: 255,
	},
	tags: [
		{
			type: String,
			max: 255,
			required: true,
			default: null,
		},
	],
	favoritedUsers: [
		{
			type: String,
			max: 255,
			required: true,
			default: null,
		},
	],
});

LectureSchema.method("toJSON", function () {
	const { _v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

export default mongoose.model("Lectures", LectureSchema);
