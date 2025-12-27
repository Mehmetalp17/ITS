import express from 'express';
import {
    getAllTerms,
    createTerm,
    getStudentsByDepartmentAndTerm,
    getStudentDetails,
    upsertStudent
} from '../controllers/studentController.js';

const router = express.Router();

// Term routes
router.get('/terms', getAllTerms);
router.post('/terms', createTerm);

// Student routes
router.get('/students/:departmentId/:termId', getStudentsByDepartmentAndTerm);
router.get('/student/:studentId', getStudentDetails);
router.post('/student', upsertStudent);

export default router;
