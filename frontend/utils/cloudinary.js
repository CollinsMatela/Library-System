import axios from "axios";
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file, resourceType = "image") => {
            if (!file) return "";

            const formData = new FormData();

            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
                formData
            );

            return response.data.secure_url;
};