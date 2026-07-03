import express from 'express';
import EditBookInformationController from '../controllers/EditBookInformationController.js';

const router = express.Router();
router.put('/update-book/:bookId', EditBookInformationController);

export default router;