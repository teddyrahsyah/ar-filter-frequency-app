import Lecture from "../models/Lecture.js";
import { createLectureValidation } from "../validation.js";

export const createLecture = async (req, res) => {

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
