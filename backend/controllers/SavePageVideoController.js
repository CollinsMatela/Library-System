import Book_Model from "../models/Books_Model.js";
import cloudinary from "../config/cloudinary.js";

// This controller is the "final approval" step.
// When the admin clicks Save, we:
//   1. Upload the generated video to Cloudinary (so it stays forever).
//   2. Save the Cloudinary URL into the page's `pageVideo` field.
const SavePageVideoController = async (req, res) => {
    // Step 1: Read the values sent by the frontend.
    const { bookId, pageId, videoUrl } = req.body;

    if (!bookId || !pageId || !videoUrl) {
        return res.status(400).json({
            message: "bookId, pageId and videoUrl are required.",
        });
    }

    try {
        // Step 2: Upload the generated video to Cloudinary.
        // Cloudinary can fetch the video straight from the fal.ai URL,
        // so we just hand it the URL and it stores the file for us.
        const uploadedVideo = await cloudinary.uploader.upload(videoUrl, {
            resource_type: "video",
            folder: "page-videos",
        });

        // Step 3: Save the Cloudinary URL to ONLY this page's pageVideo field.
        const result = await Book_Model.updateOne(
            { _id: bookId, "pages._id": pageId },
            { $set: { "pages.$.pageVideo": uploadedVideo.secure_url } }
        );

        if (result.matchedCount === 0) {
            // The page was not found, so remove the video we just uploaded
            // to avoid leaving an unused file in Cloudinary.
            await cloudinary.uploader.destroy(uploadedVideo.public_id, { resource_type: "video" });
            return res.status(404).json({ message: "Book or page not found." });
        }

        // Step 4: Tell the frontend it worked, and send back the saved URL.
        return res.status(200).json({
            message: "Video saved successfully.",
            pageVideo: uploadedVideo.secure_url,
        });
    } catch (error) {
        console.error("Error saving page video:", error);
        return res.status(500).json({ message: "Failed to save the video." });
    }
};

export default SavePageVideoController;
