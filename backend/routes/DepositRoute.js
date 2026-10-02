import express from "express";
import { createDeposit, getDeposits } from "../controllers/DepositController.js";

const router = express.Router()
router.post('/deposit-id', createDeposit)
router.get('/get-deposits', getDeposits)

export default router