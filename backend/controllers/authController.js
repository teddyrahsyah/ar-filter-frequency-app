import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";

import { generateAccessToken } from "../helpers/generateToken.js";
import { registerValidation, loginValidation } from "../helpers/validation.js";

export const register = async (req, res) => {
	// Validate the request
	const { error } = registerValidation(req.body);
	if (error)
		return res.status(401).json({
			status: 401,
			error: {
				message: error.details[0].message,
			},
		});

	// Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist)
		return res.status(400).json({
			status: 400,
			error: {
				message: "Email already exists!",
			},
		});

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Create a new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
		isSuperuser: req.body.isSuperuser ? req.body.isSuperuser : false,
	});

	user.save()
		.then((result) => {
			res.status(201).json({
				status: "201",
				message: "User created successfully.",
				data: result,
			});
		})
		.catch((err) => {
			res.status(409).json({
				status: 409,
				error: {
					message: err.message || "Some error while creating user!",
				},
			});
		});
};

export const login = async (req, res) => {
	// Validate the request
	const { error } = loginValidation(req.body);
	if (error)
		return res.status(401).json({
			status: 401,
			error: {
				message: error.details[0].message,
			},
		});

	// Checking if the email exists
	const userData = await User.findOne({ email: req.body.email });
	if (!userData)
		return res.status(400).json({
			status: 400,
			error: {
				message: "Email not found!",
			},
		});

	// Checking if the password is correct
	const validPass = await bcrypt.compare(req.body.password, userData.password);
	if (!validPass)
		return res.status(400).json({
			status: 400,
			error: {
				message: "Email or Password is invalid!",
			},
		});

	// Create and assign a token
	const accessToken = generateAccessToken(userData.toJSON());

	res.status(200).json({
		status: 200,
		id: userData.id,
		username: userData.email,
		accessToken: accessToken,
	});
};
