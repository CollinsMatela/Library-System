import express from "express";
import User_Registration_Controller from "../controllers/User_Registration_Controller.js";

const router = express.Router();
router.post("/register-user", User_Registration_Controller);

export default router;