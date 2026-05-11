import express from "express";
import upload from "../config/multer.js";
// import uploadPdf  from "../config/multerPdf.js"
import Upload_Manually_Controller from "../controllers/Upload_Manully_Controller.js";

const router = express.Router();

router.post(
  "/upload-manually",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 }
  ]),
  (req, res, next) => {
    console.log("FILES RECEIVED:", req.files);
    next();
  },
  Upload_Manually_Controller
);

export default router;