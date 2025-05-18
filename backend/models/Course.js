// models/Course.js
// const mongoose = require('mongoose');
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
},
description: {
    type:String,
    required: true,
  },

  owner: {
    // Only a teacher and admin can be an owner
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  isPublished: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


export default mongoose.model('Course', courseSchema);