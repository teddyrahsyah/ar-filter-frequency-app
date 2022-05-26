import multer from "multer";

import path from "path";

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

export var upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		var ext = path.extname(file.originalname).toLowerCase();
		if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
			return cb(new Error("Only images are allowed"));
		}
		cb(null, true);
	},
}).single('imageData');
