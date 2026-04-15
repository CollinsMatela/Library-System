import express from "express";
import Fetch_Employee_Controller from "../controllers/Fetch_Employee_Controller.js";

const router = express.Router();
router.get("/get-employees", Fetch_Employee_Controller);

export default router;