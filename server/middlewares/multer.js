import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure uploads folder exists
const uploadPath = path.join('uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadPath);
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
