import express from 'express'
import { SubmitReport, fetchReports, fetchReportsByMonthAndYear } from '../controllers/ReportController.js';
const router = express.Router()

router.post('/submit-report', SubmitReport);
router.get('/fetch-reports', fetchReports);

export default router