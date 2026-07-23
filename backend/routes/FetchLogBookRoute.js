import FetchLogBookController from '../controllers/FetchLogBookController.js'
import express from 'express'

const router = express.Router();
router.get("/get-all-logbook", FetchLogBookController);

export default router;