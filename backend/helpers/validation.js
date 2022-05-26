import Joi from "@hapi/joi";

export const registerValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().min(6).required(),
		isSuperuser: Joi.boolean(),
	});

	return schema.validate(data);
};

export const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().min(6).required(),
	});

	return schema.validate(data);
};

export const createLectureValidation = (data) => {
	const schema = Joi.object({
		moduleNumber: Joi.number().required(),
		category: Joi.string().required(),
		title: Joi.string().required(),
		description: Joi.string().required(),
		imageUrl: Joi.string().dataUri(),
		modelAR: Joi.string().required(),
		tags: Joi.array().items(Joi.string()),
		isFavorite: Joi.boolean(),
	});

	return schema.validate(data);
};