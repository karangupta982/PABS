import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import authroutes from './routes/authRoutes.js';
import {auth} from './middlewares/auth.js';
import { getStudentData } from './controllers/studentController.js';
import adminRoutes from './routes/adminRoutes.js'
import { superAdminController } from './controllers/superAdminController.js';
import courseRoutes from './routes/courseRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// app.use(cors());
app.use(cors({
  // origin: 'https://policy-based-auth.vercel.app', 
  origin: 'http://localhost:3000', 
  credentials: true,               
}));

app.use('/api/v1/auth',authroutes)
app.use('/api/v1/getstudentdata',auth, getStudentData)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/superadmin/roles', auth , adminRoutes)
app.use('/api/v1/courses', auth, courseRoutes)







mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
