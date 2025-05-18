import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Admin from "../models/Admin.js";


dotenv.config();

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // console.log("req ki body: ",req.body);
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !role
      ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        });
      }
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists. Please login in to continue.",
        });
      }
  
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        role,
      });
      // console.log("user Created Successfully", newUser);
      if (role === "student") {
        await Student.create({
          user: newUser._id,
          teacher: null, // Will  assigne later
        });
      }

      if (role === "teacher") {
        await Teacher.create({
          user: newUser._id,
          students: [],
        });
      }

      if (role === "admin") {
        await Admin.create({
          user: newUser._id,
        });
      }
      
      return res.status(200).json({
        success: true,
        user:newUser,
        message: "User Signup successfull",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "User cannot be signed Up. Please try again.",
      });
    }
  };
  
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        });
      }
  
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
  
        user.token = token;
        user.password = "undefined";
        // user.password = undefined;
  
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
  
  
        res.cookie("token", token, options).status(200).json({
          success: true,
          token : token,
          user,
          message: `User Login Successfull`,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        });
      }
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      });
    }
  };


  
