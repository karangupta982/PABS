import Student from "../models/Student.js";

export const unassignedStudents= async(req,res) => {
    try {
    const unassignedStudents = await Student.find({ teacher: null })
        .populate('user', 'firstName lastName email');
    res.json(unassignedStudents);
    } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
    }
}