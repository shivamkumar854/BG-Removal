import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

// App Config
const PORT = process.env.PORT || 4000;
const app = express();

// Initialize Middleware
app.use(express.json());
app.use(cors());

// API routes
app.get('/', (req, res) => res.send('API Working'));
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log('Server is running on port ' + PORT));
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error.message);
    process.exit(1); // Exit with failure
  }
};

startServer();
