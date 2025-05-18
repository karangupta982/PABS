import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

export const assignTeacher = async (req,res) => {
  const { studentId, teacherId } = req.body;

  try {
    
    const student = await Student.findByIdAndUpdate(
      studentId,
      {
        teacher: teacherId,
      },
      { new: true }
    );

    
    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        $push: { students: studentId },
      },
      { new: true }
    );

    res.json({ message: "Teacher assigned successfully", student, teacher });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to assign student to teacher",
      error: err,
    });
  }
};
