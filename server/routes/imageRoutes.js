import express from 'express';
import { removeBgImage } from '../controllers/ImageController.js';
import upload from '../middlewares/multer.js';
import { authUser } from '../middlewares/auth.js'; // ✅ Fixed import

const imageRouter = express.Router();

imageRouter.post('/remove-bg', upload.single('image'), authUser, removeBgImage);

export default imageRouter;
