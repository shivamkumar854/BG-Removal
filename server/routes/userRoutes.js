import express from 'express';
import { clerkWebhooks, userCredits } from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js'; // ✅ Fixed here

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhooks);
userRouter.get('/credits', authUser, userCredits);

export default userRouter;
