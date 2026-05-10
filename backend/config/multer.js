// config/multer.js
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "./cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "library_images", // folder name in Cloudinary
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

// const upload = multer({ storage });

// export default upload;
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";
import path from "path";
import fs from "fs";

// ensure uploads folder exists
const pdfDir = "uploads/pdfs";
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

/* =========================
   CLOUDINARY STORAGE (IMAGE)
========================= */
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "library_images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

/* =========================
   DISK STORAGE (PDF)
========================= */
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

/* =========================
   FILE FILTER (IMPORTANT)
========================= */
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    // only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"), false);
    }
  } else if (file.fieldname === "pdfFile") {
    // only pdf
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"), false);
    }
  } else {
    cb(new Error("Invalid field name"), false);
  }
};

/* =========================
   STORAGE ROUTER (KEY PART)
========================= */
const storage = multer.memoryStorage(); 
// we override storage per file manually below

const upload = multer({
  storage,
  fileFilter,
});

/* =========================
   CUSTOM HANDLER MIDDLEWARE
========================= */
upload.fieldsWithStorage = (fields) => {
  const imageUpload = multer({ storage: imageStorage }).fields([
    { name: "image", maxCount: 1 },
  ]);

  const pdfUpload = multer({ storage: pdfStorage }).fields([
    { name: "pdfFile", maxCount: 1 },
  ]);

  return (req, res, next) => {
    imageUpload(req, res, (err) => {
      if (err) return next(err);

      pdfUpload(req, res, (err2) => {
        if (err2) return next(err2);

        next();
      });
    });
  };
};

export default upload;