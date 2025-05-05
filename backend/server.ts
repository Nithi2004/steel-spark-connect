import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';

const app = express();

app.use(cors({
  origin: 'http://localhost:8080', // or your frontend origin
  credentials: true,               // allows cookies/headers if needed
}));

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://nnithish567:nithish20092004@cluster0.0f3dbml.mongodb.net/SS_Steel_India?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch((err: Error) => console.error('MongoDB error:', err.message));

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
