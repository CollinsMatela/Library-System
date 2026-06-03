import express from 'express';
import Fetch_QuizResults_Contrller from '../controllers/Fetch_QuizResults_Controller.js';

const router = express.Router();
router.get('/get-quiz-results', Fetch_QuizResults_Contrller);

export default router;