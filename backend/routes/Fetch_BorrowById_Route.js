import express from "express";
import Fetch_BorrowById_Controller from "../controllers/Fetch_BorrowById_Controller.js";

const router = express.Router();

router.get("/get-borrow/:userId", Fetch_BorrowById_Controller);

export default router;