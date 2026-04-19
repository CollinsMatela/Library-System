import express from 'express'
import Edit_Employee_Controller from '../controllers/Edit_Employee_Controller.js'

const router = express.Router();
router.put("/update-employee-account/:employeeId", Edit_Employee_Controller)

export default router;