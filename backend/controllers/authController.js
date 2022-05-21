import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { registerValidation, loginValidation } from "../validation.js";

export const register = async (req, res) => {
	// Validate the request
	const { error } = registerValidation(req.body);
	if (error) return res.status(401).json({ message: error.details[0].message });

	// Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).json({ message: "Email already exist..." });

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
	try {
		const savedUser = await user.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const login = async (req, res) => {
	// Validate the request
	const { error } = loginValidation(req.body);
	if (error) return res.status(401).json({ message: error.details[0].message });

	// Checking if the email exists
	const userData = await User.findOne({ email: req.body.email });
	if (!userData) return res.status(400).json({ message: "Email is not found..." });

	// Checking if the password is correct
	const validPass = await bcrypt.compare(req.body.password, userData.password);
	if (!validPass) return res.status(400).json({ message: "Email or Password is invalid..." });

	// Create and assign a token
	const token = jwt.sign(userData.toJSON(), process.env.ACCESS_TOKEN_SECRET);
	res.json({ accessToken: token });
};



