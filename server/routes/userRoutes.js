import express from 'express';
import { clerkWebhooks, userCredits } from '../controllers/UserController.js'; // ✅ Fix import
import { authUser } from '../middlewares/auth.js'

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhooks); // ✅ Fix function name
userRouter.get('/credits', authUser,userCredits)

export default userRouter;
