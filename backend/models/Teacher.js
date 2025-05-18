import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dataScope:{
      type:String,
      default: "assigned",
    },
    actions: {
      type: [{
        type: String,
        enum: ['view', 'edit', 'delete'],
      }],
      default:  ['view', 'edit'], 
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Teacher', TeacherSchema);
