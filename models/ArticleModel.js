import mongoose from "mongoose";

const ArticleSchema = mongoose.Schema({
	author: {
		type: String,
		max: 255,
		default: "Admin",
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
	image: {
		type: String,
		required: true,
		max: 255,
	},
}, { timestamps: true });

ArticleSchema.method("toJSON", function () {
	const { _v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

export default mongoose.model("Articles", ArticleSchema);
