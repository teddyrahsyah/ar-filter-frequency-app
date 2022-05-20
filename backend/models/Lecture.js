import mongoose from "mongoose";

const LectureSchema = mongoose.Schema({
	moduleNumber: {
		type: Number,
		required: true,
	},
	name: {
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
	imageUrl: {
		type: String,
		required: true,
		max: 255,
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
	isFavorite: {
		type: Boolean,
		required: true,
		default: false,
	},
});

export default mongoose.model("Lectures", LectureSchema);