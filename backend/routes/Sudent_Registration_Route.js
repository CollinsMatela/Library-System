import express from "express";
import Student_Registration_Controller from "../controllers/Student_Registration_Controller.js";

const router = express.Router();
router.post("/register-student", Student_Registration_Controller);

export default router;