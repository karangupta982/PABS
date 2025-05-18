import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },


    actions: {
      type: [{
        type: String,
        enum: ['view', 'edit', 'delete'],
      }],
      default:  ['view'], 
    },


    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher', 
      
    },
    dataScope:{
      type:String,
      default: "own",
    },
    enrollmentDate: { 
      type: Date,
      default: Date.now
    },
  },
  { timestamps: true }
);

export default mongoose.model('Student', StudentSchema);
