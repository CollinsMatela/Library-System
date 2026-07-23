import express from "express";
import  LogBookController  from "../controllers/LogBookController.js";

const router = express.Router();

router.post("/register-visitor", LogBookController);

export default router;