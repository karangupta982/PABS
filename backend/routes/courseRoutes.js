import express from 'express';
const router = express.Router();

import * as admin from '../controllers/adminCourseController.js';
import * as teacher from '../controllers/teacherCourseController.js';

router.get('/', admin.getAllCourses);
router.post('/admin', admin.createCourse);
router.put('/admin/:id',  admin.updateCourse);
router.delete('/admin/:id',  admin.deleteCourse);
router.put('/admin/:id/publish', admin.publishCourse);
router.put('/admin/:id/unpublish', admin.unpublishCourse);
router.put('/admin/:id/assign-students',  admin.assignStudents);

router.post('/teacher', teacher.createCourse);
router.put('/teacher/:id',  teacher.updateOwnCourse);
router.put('/teacher/:id/assign-students', teacher.assignStudentsToOwnCourse);

export default router;