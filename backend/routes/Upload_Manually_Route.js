import express from "express";
import upload from "../config/multer.js";
import Upload_Manually_Controller from "../controllers/Upload_Manully_Controller.js";

const router = express.Router();

router.post("/upload-manually", upload.single("image"), Upload_Manually_Controller);

export default router;