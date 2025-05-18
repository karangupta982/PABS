// controllers/adminCourseController.js

import Course from "../models/Course.js"; 
import User from "../models/User.js";


export const createCourse = async (req, res) => {
  try {
    // console.log("entered in createcourse controller")
    // console.log("req.body", req.body);
    const { title, description } = req.body;
    const owner = JSON.parse(req.body.owner);

    // console.log("title",title);
    // console.log("description",description);
    // console.log("owner",owner);
    const course = await Course.create({ title, description, owner });

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    // console.log("enter in udate course controller");
    const courseId = req.params.id;
    const { title, description } = req.body;
    const course = await Course.findByIdAndUpdate(
        courseId,
        { title, description },
        { new: true }
    );
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    // console.log("enter in delete course controller")
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const publishCourse = async (req, res) => {
  try {
    // console.log("enter in publish course controller")
    // console.log("req.params",req.params)
    const courseId = req.params.id ;
    const course = await Course.findByIdAndUpdate(
        courseId,
      { isPublished: true },
      { new: true }
    );
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const unpublishCourse = async (req, res) => {
  try {
    // console.log("enter in unpublish course controller")
    const courseId = req.params.id ;
    const course = await Course.findByIdAndUpdate(
        courseId,
      { isPublished: false },
      { new: true }
    );
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const assignStudents = async (req, res) => {
    try {
      // console.log("Enter in assign students controller");
      
      const { students: studentEmails } = req.body;
  
     
      const studentDocs = await User.find({ email: { $in: studentEmails }, role: "student" });
  
      if (!studentDocs || studentDocs.length === 0) {
        return res.status(404).json({ message: "No students found with provided emails." });
      }
  
      const studentIds = studentDocs.map(student => student._id);
  
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { students: { $each: studentIds } } },
        { new: true }
      ).populate("students", "firstName lastName email");
  
      res.json({
        message: "Students assigned successfully",
        course,
      });
    } catch (err) {
      console.error("Error assigning students:", err);
      res.status(400).json({ message: err.message });
    }
  };
  




export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
