import express from "express";
import Edit_Student_Controller from "../controllers/Edit_Student_Controller.js";

const router = express.Router();

router.put("/update-student-account/:studentId", Edit_Student_Controller)

export default router;