import express from 'express'
import Fetch_AllBorrow_Controller from '../controllers/Fetch_AllBorrow_Controller.js';
const router = express.Router();
router.get('/fetch-all-borrow', Fetch_AllBorrow_Controller);

export default router;