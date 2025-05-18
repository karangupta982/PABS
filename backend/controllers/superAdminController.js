import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";


export const superAdminController = async (req,res) => {
    try{
        // console.log("entered in superadmin controller");
            const role  = req.params.role.toLowerCase();
            const { actions } = req.body;

            // const { role, actions } = req.body;
            
            // console.log("role",role)

            // console.log("actions",actions)
            try {
            if (role === 'teacher') {
                await Teacher.updateMany({}, { actions });
            } else if (role === 'student') {
                await Student.updateMany({}, { actions });
            } else if (role === 'admin') {
                await Admin.updateMany({}, { actions });
            } else {
                return res.status(400).json({ message: 'Invalid role' });
            }
        
            res.status(200).json({ message: 'Actions updated successfully' });
            } catch (error) {
            res.status(500).json({ message: 'Server error', error });
            }
        }
    catch(err){
        // console.log("error in superadmin controller",err);
        return res.status(500).json({
            success:false,
            message:"failed to update actions",
            error:err,
        })
    }
}
