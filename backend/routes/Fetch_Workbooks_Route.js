import express from 'express'
import Fetch_WorkBooks_Controller from '../controllers/Fetch_WorkBooks_Controller.js'

const router = express.Router();
router.get("/get-workbooks", Fetch_WorkBooks_Controller);

export default router;