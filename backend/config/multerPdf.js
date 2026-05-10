import multer from "multer";

const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pdfs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF allowed"), false);
    }
  },
});

export default uploadPdf;

