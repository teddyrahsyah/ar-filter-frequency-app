import fs from "fs";
import path from "path";
import Lecture from "../models/LectureModel.js";
import { createLectureValidation } from "../helpers/validation.js";

export const create = async (req, res) => {
	// Verify User if the user is Admin or not
	if (!req.user.isSuperuser)
		return res.status(403).json({
			status: 403,
			error: {
				message: "Forbidden Access!",
			},
		});

	// Validate the request
	const { error } = createLectureValidation(req.body);
	if (error)
		return res.status(401).json({
			status: 401,
			error: {
				message: error.details[0].message,
			},
		});

	const lecture = new Lecture({
		moduleNumber: req.body.moduleNumber,
		category: req.body.category,
		title: req.body.title,
		description: req.body.description,
		imageData: {
			data: fs.readFileSync(path.join(path.resolve() + "/public/uploads/" + req.file.filename)),
			contentType: "image/png",
		},
		modelAR: req.body.modelAR,
		tags: req.body.tags,
	});

	lecture
		.save()
		.then((result) => {
			res.status(201).json({
				status: 201,
				message: "Lecture created successfully.",
				data: result,
			});
		})
		.catch((err) => {
			res.status(409).json({
				status: 409,
				error: {
					message: err.message || "Some error while creating data!",
				},
			});
		});
};

export const findAll = async (req, res) => {
	Lecture.find({}, { __v: 0, favoritedUsers: 0 })
		.then((result) => {
			if (!result)
				return res.status(404).json({
					status: 404,
					error: {
						message: "Data not found!",
					},
				});
			res.status(200).json({
				status: 200,
				data: result,
			});
		})
		.catch((err) => {
			res.status(409).json({
				status: 409,
				error: {
					message: err.message || "Some error while retrieving data!",
				},
			});
		});
};

export const findOne = async (req, res) => {
	const id = req.params.id;

	Lecture.findById(id, { __v: 0, favoritedUsers: 0 })
		.then((result) => {
			if (!result)
				return res.status(404).json({
					status: 404,
					error: {
						message: "Data not found!",
					},
				});

			res.status(200).json({ data: result });
		})
		.catch((err) => {
			res.status(409).json({
				status: 409,
				error: {
					message: err.message || "Some error while retrieving data!",
				},
			});
		});
};

export const update = async (req, res) => {
	// Validate the request
	const { error } = createLectureValidation(req.body);
	if (error)
		return res.status(401).json({
			status: 401,
			error: {
				message: error.details[0].message,
			},
		});

	const id = req.params.id;

	Lecture.findByIdAndUpdate(id, req.body)
		.then((result) => {
			if (!result)
				return res.status(404).json({
					status: 404,
					error: {
						message: "Data not found!",
					},
				});

			res.status(201).json({
				status: 201,
				message: "Data updated successfuly.",
			});
		})
		.catch((err) => {
			res.status(409).json({
				status: 409,
				error: {
					message: err.message || "Some error while updating data!",
				},
			});
		});
};

export const remove = async (req, res) => {
	// Verify User if the user is Admin or not
	if (!req.user.isSuperuser)
		return res.status(403).json({
			status: 403,
			error: {
				message: "Forbidden Access!",
			},
		});

	const id = req.params.id;

	Lecture.findByIdAndDelete(id)
		.then((result) => {
			if (!result)
				return res.status(404).json({
					status: 404,
					error: {
						message: "Data not found!",
					},
				});

			res.status(204).json({
				status: 204,
				message: "Data deleted successfully.",
			});
		})
		.catch((err) => {
			res.status(409).json({
				status: 409,
				error: {
					message: err.message || "Some error while deleting data!",
				},
			});
		});
};

// Favorite Feature
export const addToFavorite = async (req, res) => {
	const user = req.user.name;

	const id = req.params.id;

	// return res.json(user)

	Lecture.findByIdAndUpdate(id, { $addToSet: { favoritedUsers: user } })
		.then((result) => {
			if (!result)
				return res.status(404).json({
					status: 404,
					error: {
						message: "Data not found!",
					},
				});

			res.status(201).json({
				status: 201,
				message: "Data updated successfuly.",
			});
		})
		.catch((err) => {
			res.status(409).json({
				status: 409,
				error: {
					message: err.message || "Some error while updating data!",
				},
			});
		});
};

export const deleteFavorite = async (req, res) => {
	const user = req.user.name;

	const id = req.params.id;

	Lecture.findByIdAndUpdate(id, { $pull: { favoriteUsers: user } })
		.then((result) => {
			if (!result)
				return res.status(404).json({
					status: 404,
					error: {
						message: "Data not found!",
					},
				});

			res.status(201).json({
				status: 201,
				message: "Data updated successfuly.",
			});
		})
		.catch((err) => {
			res.status(409).json({
				status: 409,
				error: {
					message: err.message || "Some error while updating data!",
				},
			});
		});
};

export const findFavorite = async (req, res) => {
	const user = req.user.name;

	Lecture.find({ favoritedUsers: user }, { __v: 0, favoritedUsers: 0 })
		.then((result) => {
			if (!result)
				return res.status(404).json({
					status: 404,
					error: {
						message: "Data not found!",
					},
				});

			res.status(200).json({
				status: 200,
				data: result,
			});
		})
		.catch((err) => {
			res.status(409).json({
				status: 409,
				error: {
					message: err.message || "Some error while retrieving data!",
				},
			});
		});
};
