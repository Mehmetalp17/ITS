import express from 'express';
import multer from 'multer';
import {
  parsePdf,
  createInternship,
  getInternships,
  updateInternship,
  deleteInternship,
  debugDeleteInternship,
  generateCommissionReport,
  uploadDocument,
  getDocumentUrl,
  upload as uploadMiddleware
} from '../controllers/internshipController.js';
import { authenticateToken, requireRole } from '../middlewares/auth.js';

const router = express.Router();

// Configure multer for file uploads (store in memory)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Parse PDF file (no auth required for testing, can add auth later)
router.post('/internship/parse-pdf', upload.single('file'), parsePdf);

// Create internship from parsed data (requires authentication)
router.post('/internship/create', authenticateToken, requireRole(['Commission Chair', 'Commission Member', 'General Admin']), createInternship);

// Get internships with filters
router.get('/internships', authenticateToken, getInternships);

// Update internship
router.put('/internship/:id', authenticateToken, requireRole(['Commission Chair', 'Commission Member', 'General Admin']), updateInternship);

// Delete internship
router.delete('/internship/:id', authenticateToken, requireRole(['Commission Chair', 'General Admin']), deleteInternship);

// Generate commission evaluation report
router.post('/internship/generate-report', authenticateToken, requireRole(['Commission Chair', 'Commission Member', 'General Admin']), generateCommissionReport);

// Upload document for internship
router.post('/internship/upload-document', authenticateToken, requireRole(['Commission Chair', 'Commission Member', 'General Admin']), uploadMiddleware.single('file'), uploadDocument);

// Get signed URL for internship document
router.get('/internship/:id/document-url', authenticateToken, getDocumentUrl);

// DEBUG: Delete internship by studentId and type (NO AUTH - for debugging only)
router.delete('/debug/internship/:studentId/:type', debugDeleteInternship);

export default router;
