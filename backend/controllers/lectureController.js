import Lecture from "../models/LectureModel.js";
import { createLectureValidation } from "../validation.js";

export const create = async (req, res) => {
	// Validate the request
	const { error } = createLectureValidation(req.body);
	if (error) return res.status(401).json({ message: error.details[0].message });

	const lecture = new Lecture({
		moduleNumber: req.body.moduleNumber,
		name: req.body.name,
		title: req.body.title,
		description: req.body.description,
		imageUrl: req.body.imageUrl,
		modelAR: req.body.modelAR,
		tags: req.body.tags,
	});

	try {
		const createdLecture = await lecture.save();
		res.status(201).json({ message: "Lecture Created!", data: createdLecture });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const findAll = async (req, res) => {
	Lecture.find()
		.then((result) => {
			if (!result) return res.status(404).json({ message: "Lecture not found..." });
			res.json({ data: result });
		})
		.catch((err) => {
			res.status(409).json({
				message: err.message || "Some error while retrieving data!",
			});
		});
};

export const findOne = async (req, res) => {
	const id = req.params.id;

	Lecture.findById(id)
		.then((result) => {
			if (!result) return res.status(404).json({ message: "Lecture not found..." });

			res.json({ data: result });
		})
		.catch((err) => {
			res.status(409).json({
				message: err.message || "Some error while retrieving data!",
			});
		});
};

export const update = async (req, res) => {
	const id = req.params.id;

	Lecture.findByIdAndUpdate(id, req.body)
		.then((result) => {
			if (!result) return res.status(404).json({ message: "Lecture not found..." });

			res.json({
				message: "Lecture was updated",
				data: result,
			});
		})
		.catch((err) => {
			res.status(409).json({
				message: err.message || "Some error while updating lecture!",
			});
		});
};

export const remove = async (req, res) => {
	const id = req.params.id;

	Lecture.findByIdAndDelete(id)
		.then((result) => {
            if (!result) return res.status(404).json({ message: "Lecture not found..." });

            res.json({
				message: "Lecture was deleted",
			});
        })
		.catch((err) => {
            res.status(409).json({
				message: err.message || "Some error while deleting lecture!",
			});
        });
};
