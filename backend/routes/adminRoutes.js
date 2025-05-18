import express from 'express';
const router = express.Router();

import {
    unassignedStudents
  } from "../controllers/unassignedStudents.js";

import {getAllTeachers} from "../controllers/teachers.js" 

import { assignTeacher } from '../controllers/assignTeacher.js';

import {superAdminController} from '../controllers/superAdminController.js';



router.get("/unassignedstudents", unassignedStudents);

router.get("/teachers", getAllTeachers);

router.put('/assignteacher',assignTeacher);

router.post('/:role', superAdminController)

export default router;