import cloudinary from "../config/cloudinary.js";
import Student from "../models/User_Registration_Model.js";
import Teacher from "../models/Employee_Registration_Model.js";

const Change_Avatar_Controller = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const avatarFile = req.file;

        if (!avatarFile) {
            return res.status(400).json({
                message: "Avatar is required",
            });
        }

        // upload to cloudinary
        const uploadedImage = await cloudinary.uploader.upload(
            `data:${avatarFile.mimetype};base64,${avatarFile.buffer.toString("base64")}`
        );

        const avatarUrl = uploadedImage.secure_url;

        let updatedUser;

        const userRole = role?.toLowerCase();

        if (userRole === "student") {
            updatedUser = await Student.findOneAndUpdate(
                { id: userId },
                { avatar: avatarUrl },
                { new: true }
            );
        } 
        else if (userRole === "teacher") {
            updatedUser = await Teacher.findOneAndUpdate(
                { id: userId },
                { avatar: avatarUrl },
                { new: true }
            );
        } 
        else {
            return res.status(400).json({
                message: "Invalid role",
            });
        }

        return res.status(200).json({
            message: "Avatar updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.log("AVATAR ERROR:", error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export default Change_Avatar_Controller;