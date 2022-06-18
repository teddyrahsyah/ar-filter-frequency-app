import multer from "multer";

export var upload = multer({
	dest: "public/uploads",
}).single("image");
