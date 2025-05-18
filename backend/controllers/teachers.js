import Teacher from "../models/Teacher.js";

export const getAllTeachers = async(req,res) => {
    try {
    const teachers = await Teacher.find()
        .populate('user', 'firstName lastName email');
    res.json(teachers);
    } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error });
    }
}