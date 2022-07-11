import multer from "multer";

export var uploadImage = multer({
	dest: "public/uploads",
}).fields([
	{
		name: "image",
		maxCount: 1,
	},
	{
		name: "model",
		maxCount: 1,
	},
	{
		name: "thumbnail",
		maxCount: 1,
	},
]);
