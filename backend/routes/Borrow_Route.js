import express from 'express'
import Borrow_Controller from '../controllers/Borrow_Controller.js'

const router = express.Router();

router.post('/request-borrow', Borrow_Controller);

export default router