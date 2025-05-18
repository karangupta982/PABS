
import applyPolicy from "../utils/applyPolicy.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import User from "../models/User.js";

export const getStudentData = async (req, res) => {
  const role = req.user.role;
  const userId = req.user.id;
  // console.log("role",role);
  // console.log("userId",userId);
  const policy = applyPolicy(role);

  // console.log("policy: ", policy);

  let data;
  if (policy.dataScope === 'all') {
    // console.log("entered in admin")
    data = await Student.find().populate("user").exec();
  } else if (policy.dataScope === 'assigned') {
    // data = await Teacher.find({ assignedTo: userId });
    // console.log("entered in teacher")
    // data = await Teacher.findOne({user: userId}).populate("students").exec();
    data = await Teacher.findOne({ user: userId })
    .populate({
      path: "students",
      populate: {
        path: "user", 
      },
    })
    .exec();
    // data = await Teacher.findById(userId).populate("students").exec();
    // console.log("teacher data in student controller:",data);
    // data = data.data.data.students;
  } else {
    // console.log("entered in student")
    // data = await User.findById( userId );
    data = await Student.findOne({ user: userId }).populate("user").exec();
    // console.log("data in student controller: ", data);
    data = data.user;

  }

  // console.log("Fetched data from the database: ", data);
  if(!data){
    // console.log("No data found while searching for student data")
  }
  res.json({
    data,
    allowedActions: policy.actions
  });
};
