import Course from "../models/Course.js";
import User from "../models/User.js";

export const createCourse = async (req, res) => {
  try {
    // console.log("enter in create course by teacher controller")
    // const course = await Course.create({
    //   ...req.body,
    //   owner: req.user._id,
    // });
    const { title, description } = req.body;
    const owner = JSON.parse(req.body.owner);
    const course = await Course.create({ title, description, owner });

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateOwnCourse = async (req, res) => {
  try {
    // console.log("enter in update course by teacher controller")
    const courseId = req.params.id;
    const { title, description } = req.body;
    // console.log("courseId",courseId)
    // console.log("title",title)
    // console.log("description",description)
    const course = await Course.findByIdAndUpdate(
        courseId,
        { title, description },
        { new: true }
    );
    if (!course) {
        return res.status(404).json({ message: 'Not allowed' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const assignStudentsToOwnCourse = async (req, res) => {
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
  