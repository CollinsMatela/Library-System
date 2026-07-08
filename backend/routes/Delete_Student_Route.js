import express from "express";
import Delete_Student_Controller from "../controllers/Delete_Student_Controller.js";

const router = express.Router();

router.delete("/delete-student/:id", Delete_Student_Controller);

export default router;