import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../users/userModule.js'; 

import createError from '../error/apperror.js';

const authController = {
  signup: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return next(new createError('User already exists', 400));
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      // Assigning JWT (json web token) to user
      const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
        expiresIn: '90d',
      });

      res.status(201).json({
        status: 'success',
        message: 'User registered',
        token,
        user:{
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role,
        }
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
   try{
    const{email,password}= req.body;
    const user= await User.findOne({ email });
    if (!user) return next(new createError('User not found', 404));
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return next(new createError("Incorrect email or Password", 401));
    }
    const token = jwt.sign({ _id: user._id }, 'secretkey123', {
        expiresIn: '90d',
      });
      res.status(200).json({
        status: 'success',
        token,
        message: 'Logged in successfully',
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        }
        
      });
   }catch(error){
    next(error);
   }
  }
};

export default authController;
