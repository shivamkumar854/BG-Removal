import express from 'express';
import { clerkWebhooks } from '../controllers/UserController.js'; // ✅ Fix import

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhooks); // ✅ Fix function name

export default userRouter;
