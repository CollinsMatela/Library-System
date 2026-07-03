import express from "express";
import DeleteBookController from "../controllers/DeleteBookController.js";

const router = express.Router();
router.delete('/delete-book/:bookId', DeleteBookController);

export default router;