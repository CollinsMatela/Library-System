import express from "express";
import { createDeposit, getDeposits, returnDeposit } from "../controllers/DepositController.js";

const router = express.Router()
router.post('/deposit-id', createDeposit)
router.get('/get-deposits', getDeposits)
router.put('/return-deposit/:id', returnDeposit);

export default router