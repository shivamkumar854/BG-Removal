import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'; // ✅ Clerk middleware

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Clerk middleware - Required to enable getAuth(req)
app.use(ClerkExpressWithAuth());

// Routes
app.get('/', (req, res) => res.send('✅ API is working'));
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();
