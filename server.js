import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import movieRoutes from './routes/movieRoutes.js';
import { getMovieById } from './controllers/movieController.js';
import path from 'path';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/movies', movieRoutes);
app.get('/movies/getMovieById/:id', getMovieById);  // Use the getMovieById controller for this route


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

