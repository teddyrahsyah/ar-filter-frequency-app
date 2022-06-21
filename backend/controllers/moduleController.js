import fs from "fs";
import path from "path";
import Module from "../models/ModuleModel.js";
import { createModuleValidation } from "../helpers/validation.js";

import util from "util";
const unlinkFile = util.promisify(fs.unlink);

import { uploadFile } from "../helpers/s3.js";

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
	const { error } = createModuleValidation(req.body);
	if (error)
		return res.status(401).json({
			status: 401,
			error: {
				message: error.details[0].message,
			},
		});

	const module = new Module({
		moduleNumber: req.body.moduleNumber,
		moduleTitle: req.body.title,
	});

	module
		.save()
		.then((result) => {
			res.status(201).json({
				status: 201,
				message: "Module created successfully.",
				results: result,
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

export const createTheory = async (req, res) => {
	// Verify User if the user is Admin or not
	if (!req.user.isSuperuser)
		return res.status(403).json({
			status: 403,
			error: {
				message: "Forbidden Access!",
			},
		});

	const id = req.params.id;

	// Upload Thumbnail Image
	const image = req.files.image[0];
	const uploadImageResult = await uploadFile(image);
	await unlinkFile(image.path);

	Module.findByIdAndUpdate(id, {
		$addToSet: {
			theory: [
				{
					moduleId: id,
					moduleNumber: req.body.moduleNumber,
					moduleTitle: req.body.moduleTitle,
					theoryNumber: req.body.theoryNumber,
					title: req.body.title,
					description: req.body.description,
					image: uploadImageResult.Location,
				},
			],
		},
	})
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

export const createLab = async (req, res) => {
	// Verify User if the user is Admin or not
	if (!req.user.isSuperuser)
		return res.status(403).json({
			status: 403,
			error: {
				message: "Forbidden Access!",
			},
		});

	const id = req.params.id;

	// Upload Images
	const image = req.files.image[0];
	const model = req.files.model[0];
	const thumbnail = req.files.thumbnail[0];
	const uploadImageResult = await uploadFile(image);
	const uploadModelResult = await uploadFile(model);
	const uploadThumbnailResult = await uploadFile(thumbnail);
	await unlinkFile(image.path);
	await unlinkFile(model.path);
	await unlinkFile(thumbnail.path);

	Module.findByIdAndUpdate(id, {
		$addToSet: {
			lab: [
				{
					moduleId: id,
					moduleNumber: req.body.moduleNumber,
					moduleTitle: req.body.moduleTitle,
					labNumber: req.body.labNumber,
					title: req.body.title,
					description: req.body.description,
					image: uploadImageResult.Location,
					modelAR: uploadModelResult.Location,
					thumbnailAR: uploadThumbnailResult.Location,
				},
			],
		},
	})
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

export const deleteTheory = async (req, res) => {
	// Verify User if the user is Admin or not
	if (!req.user.isSuperuser)
		return res.status(403).json({
			status: 403,
			error: {
				message: "Forbidden Access!",
			},
		});

	const id = req.params.id;
    const theoryId = req.params.theoryId;

	Module.findByIdAndUpdate(id, {
		$pull: {
			theory: {_id: theoryId},
		},
	})
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
				message: "Data deleted successfuly.",
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

export const deleteLab = async (req, res) => {
	// Verify User if the user is Admin or not
	if (!req.user.isSuperuser)
		return res.status(403).json({
			status: 403,
			error: {
				message: "Forbidden Access!",
			},
		});

	const id = req.params.id;
	const labId = req.params.labId;

	Module.findByIdAndUpdate(id, {
		$pull: {
			lab: { _id: labId },
		},
	})
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
				message: "Data deleted successfuly.",
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

export const findAll = async (req, res) => {
	Module.find({}, { __v: 0, favoritedUsers: 0 })
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
				results: result,
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

	Module.findById(id, { __v: 0, favoritedUsers: 0 })
		.then((result) => {
			if (!result)
				return res.status(404).json({
					status: 404,
					error: {
						message: "Data not found!",
					},
				});

			res.status(200).json({ results: result });
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
	const { error } = createModuleValidation(req.body);
	if (error)
		return res.status(401).json({
			status: 401,
			error: {
				message: error.details[0].message,
			},
		});

	const id = req.params.id;

	Module.findByIdAndUpdate(id, req.body)
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

	Module.findByIdAndDelete(id)
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

	Module.findByIdAndUpdate(id, { $addToSet: { favoritedUsers: user } })
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

	Module.findByIdAndUpdate(id, { $pull: { favoriteUsers: user } })
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

	Module.find({ favoritedUsers: user }, { __v: 0, favoritedUsers: 0 })
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
				results: result,
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
