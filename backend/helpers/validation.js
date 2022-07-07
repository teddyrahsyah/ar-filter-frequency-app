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

export const createModuleValidation = (data) => {
	const schema = Joi.object({
		moduleNumber: Joi.number().required(),
		title: Joi.string().required(),
	});

	return schema.validate(data);
};

export const createArticleValidation = (data) => {
	const schema = Joi.object({
		title: Joi.string().required(),
    category: Joi.string().required(),
		description: Joi.string().required(),
	});

	return schema.validate(data);
};