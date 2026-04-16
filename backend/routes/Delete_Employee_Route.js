import express from "express";
import Delete_Employee_Controller from "../controllers/Delete_Employee_Controller.js";

const router = express.Router();

router.delete("/delete-employee/:employeeId", Delete_Employee_Controller);

export default router;