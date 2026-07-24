import UpdateLeaveController from "../controllers/UpdateLeaveController.js";
import express from 'express';

const router = express.Router();
router.put("/update-leave", UpdateLeaveController);

export default router