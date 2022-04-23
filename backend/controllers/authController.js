import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { registerValidation, loginValidation } from "../validation.js";

export const saveUser = async (req, res) => {
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
		isSuperuser: req.body.isSuperuser,
	});
	try {
		const savedUser = await user.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
