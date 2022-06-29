import mongoose from "mongoose";

const TheorySchema = mongoose.Schema({
	moduleId: {
		type: String,
		required: true,
		max: 255,
	},
	moduleNumber: {
		type: Number,
		required: true,
	},
	moduleTitle: {
		type: String,
		required: true,
		max: 255,
	},
	theoryNumber: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
		max: 255,
		default: "Theory",
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
});

const LabSchema = mongoose.Schema({
	moduleId: {
		type: String,
		required: true,
		max: 255,
	},
	moduleNumber: {
		type: Number,
		required: true,
	},
	moduleTitle: {
		type: String,
		required: true,
		max: 255,
	},
	labNumber: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
		max: 255,
		default: "Lab",
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
	// image: {
	// 	type: String,
	// 	required: true,
	// 	max: 255,
	// },
	modelAR: {
		type: String,
		required: true,
		max: 255,
	},
	thumbnailAR: {
		type: String,
		required: true,
		max: 255,
	},
});

const ModuleSchema = mongoose.Schema({
	moduleNumber: {
		type: Number,
		required: true,
	},
	moduleTitle: {
		type: String,
		required: true,
	},
	theory: [
		{
			type: TheorySchema,
			default: null,
		},
	],
	lab: [
		{
			type: LabSchema,
			default: null,
		},
	],
});

ModuleSchema.method("toJSON", function () {
	const { _v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

export default mongoose.model("modules", ModuleSchema);
