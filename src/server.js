import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);

//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/authentication').then(()=> console.log('connected to mongodb')).catch((error)=>console.error("Failed to connect:", error));

//global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});


//server
const PORT=3000;
app.listen(PORT, () => console.log(`API is running on ${PORT}`));
