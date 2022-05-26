import Article from "../models/ArticleModel.js";

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

	const article = new Article({
		title: req.body.title,
		description: req.body.description,
		imageData: {
			data: fs.readFileSync(path.join(path.resolve() + "/public/uploads/" + req.file.filename)),
			contentType: "image/png",
		},
		tags: req.body.tags,
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
