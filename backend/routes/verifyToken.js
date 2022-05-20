import jwt from "jsonwebtoken";

// export const verify = (req, res, next) => {
// 	const token = req.header("auth-token");
// 	if (!token) return res.status(401).json({ message: "Access Denied..." });

// 	try {
// 		const verified = jwt.verify(token, process.env.SECRET_TOKEN);
// 		req.user = verified;
// 		next();
// 	} catch (err) {
// 		res.status(400).json({ message: "Invalid Token!" });
// 	}
// };

// Function to authenticate admin (Access to Create and Edit Resources)
export const verify = (req, res, next) => {
	const authHeader = res.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};
