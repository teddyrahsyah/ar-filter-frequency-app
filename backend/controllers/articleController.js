import fs from "fs";
import Article from "../models/ArticleModel.js";

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
	const { error } = createArticleValidation(req.body);
	if (error)
		return res.status(401).json({
			status: 401,
			error: {
				message: error.details[0].message,
			},
		});

	// Upload Thumbnail Image
	const file = req.file;
	const uploadResult = await uploadFile(file);
	await unlinkFile(file.path);

	const article = new Article({
		title: req.body.title,
		category: req.body.category,
		description: req.body.description,
		image: uploadResult.Location,
	});

	article
		.save()
		.then((result) => {
			res.status(201).json({
				status: 201,
				message: "Article created successfully.",
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
	Article.find()
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

	Article.findById(id)
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
	const id = req.params.id;

	Article.findByIdAndUpdate(id)
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
				data: result,
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

	Article.findByIdAndDelete(id)
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
