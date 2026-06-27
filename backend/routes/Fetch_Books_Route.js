import express from 'express'
import Fetch_Books_Controller from '../controllers/Fetch_Books_Controller.js'

const router = express.Router();
router.get("/get-books", Fetch_Books_Controller);

export default router;