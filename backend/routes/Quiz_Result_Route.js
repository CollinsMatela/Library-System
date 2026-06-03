import express from "express";
import Quiz_Result_Controller from "../controllers/Quiz_Result_Controller.js";

const router = express.Router();

router.post("/quiz-result", Quiz_Result_Controller);

export default router;