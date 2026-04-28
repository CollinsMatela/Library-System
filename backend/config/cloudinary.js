// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

// console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
// console.log("SECRET:", process.env.CLOUDINARY_API_SECRET);

export const connectCloudinary = () => {
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
};
export default cloudinary;