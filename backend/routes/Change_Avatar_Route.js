import express from "express";
import multer from "multer";
import Change_Avatar_Controller from "../controllers/Change_Avatar_Controller.js";

const router = express.Router();

// memory storage (we upload to cloudinary manually)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/set-avatar", upload.single("avatar"), Change_Avatar_Controller);

export default router;