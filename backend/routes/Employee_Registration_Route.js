import express from "express";
import Employee_Registration_Controller from "../controllers/Employee_Registration_Controller.js";

const router = express.Router();
router.post("/register-employee", Employee_Registration_Controller);

export default router;