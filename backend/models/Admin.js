import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
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
        default:  ['view', 'edit', 'delete'], 
    },
    dataScope:{
        type:String,
        default: "all",
    },
    enrollmentDate: { 
      type: Date,
      default: Date.now
    },
  },
  { timestamps: true }
);

export default mongoose.model('Admin', AdminSchema);
