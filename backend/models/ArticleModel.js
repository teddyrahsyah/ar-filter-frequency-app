import mongoose from "mongoose";

const ArticleSchema = mongoose.Schema({
	author: {
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
	tags: [
		{
			type: String,
			max: 255,
			required: true,
			default: null,
		},
	],
	date: {
		type: Date,
		default: Date.now(),
	},
});

ArticleSchema.method("toJSON", function () {
	const { _v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

export default mongoose.model("Articles", ArticleSchema);
