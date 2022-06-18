import jwt from "jsonwebtoken";

// Function to authenticate admin (Access to Create and Edit Resources)
export const verifyUser = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.status(401).json({ message: "Unauthorized Activity!" });

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};
