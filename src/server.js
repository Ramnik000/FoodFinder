import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import User from './users/userModule.js';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt';
const app = express();

mongoose.set('strictQuery', false);

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);

//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/authentication').then(()=> console.log('connected to mongodb')).catch((error)=>console.error("Failed to connect:", error));

app.post('/signup', (req,res)=>{
  const {name, email, password} = req.body;
  User.create({name, email, password})
  .then(user => res.json(user))
  .catch(err=>res.json(err))
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
              const accessToken = jwt.sign({ email: email }, "jwt-access-token-secret-key", { expiresIn: '1m' });
              res.json({ status: "success", token: accessToken, message: "Logged in successfully", user: user });
          } else {
              // Passwords do not match
              res.json({ status: "error", message: "Invalid password" });
          }
      } else {
          // User not found
          res.json({ status: "error", message: "User not found" });
      }
  } catch (error) {
      // Handle database or server errors
      res.json({ status: "error", message: error.message });
  }
});
app.get('/signup', (req, res) => {
  res.redirect('/api/auth/signup');
});

// Redirect GET requests to /api/auth/login to /login
app.get('/api/auth/login', (req, res) => {
  res.redirect('/login');
});

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
