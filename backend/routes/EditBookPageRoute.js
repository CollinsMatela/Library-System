import express from "express";
import EditBookPageController from "../controllers/EditBookPageController.js";
import upload from "../config/multer.js";

const router = express.Router();
router.put("/update-page", upload.single("pageImage"), EditBookPageController);
export default router;