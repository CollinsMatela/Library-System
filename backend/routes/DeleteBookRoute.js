import express from "express";
import DeleteBookController from "../controllers/DeleteBookController.js";
import { deleteLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.delete('/delete-book/:bookId', deleteLimiter, DeleteBookController);

export default router;