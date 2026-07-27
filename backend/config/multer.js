import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files will be saved
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  }
});

// File filter (optional but recommended)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".mp3", ".wav", ".ogg", ".m4a"];
  const extension = path.extname(file.originalname).toLowerCase();

  const isValidExtension = allowedExtensions.includes(extension);
  const isValidMime =
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("audio/");

  if (isValidExtension && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error("Only image and audio files are allowed."));
  }
};

// Upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024 
  }
});

export default upload;