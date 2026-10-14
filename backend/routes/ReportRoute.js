import express from 'express'
import { SubmitReport, fetchReports, DeleteReport } from '../controllers/ReportController.js';
const router = express.Router()

router.post('/submit-report', SubmitReport);
router.get('/fetch-reports', fetchReports);
router.delete('/delete-report/:id', DeleteReport);

export default router