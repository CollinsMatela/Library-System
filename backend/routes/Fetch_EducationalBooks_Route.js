import express from 'express'
import Fetch_EducationalBooks_Controller from '../controllers/Fetch_EducationalBooks_Controller.js'

const router = express.Router();

router.get("/get-educationalbooks", Fetch_EducationalBooks_Controller);

export default router;