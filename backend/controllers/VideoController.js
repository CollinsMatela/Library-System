import { fal } from "@fal-ai/client";

// Turn a fal.ai error into a short, readable message.
//
// When fal.ai rejects a request it sends the reason like this:
//     { body: { detail: [ { msg: "File download error", type: "..." } ] } }
// Without this helper the user would only see the vague "Unprocessable Entity".
const getFalErrorMessage = (error) => {
    const detail = error?.body?.detail;

    if (Array.isArray(detail)) {
        const messages = detail
            .map((item) => {
                // Each item usually looks like { msg: "File download error", type: "..." }.
                if (typeof item?.msg === "string") return item.msg;
                if (typeof item?.type === "string") return item.type;
                return "";
            })
            .filter(Boolean); // drop anything empty

        if (messages.length > 0) {
            return messages.join("; ");
        }
    }

    if (typeof detail === "string") {
        return detail;
    }

    return error?.message || "Failed to generate video. Please try again.";
};

const VideoController = async (req, res) => {
    const { bookId, pageId, pageIndex, image, prompt, aspectRatio } = req.body;

    try {
        // Make sure every field we need was sent.
        if (!bookId || !pageId || pageIndex === undefined || !image || !prompt) {
            res.status(400).json({
                message: "All video generation fields are required.",
            });
            return;
        }

        // fal.ai downloads the image itself, so it needs a public http(s) URL.
        // A local value such as "blob:..." or a File object will not work here.
        if (typeof image !== "string" || !/^https?:\/\//i.test(image)) {
            res.status(400).json({
                message: "The page image must be a public URL. Please save the page image before generating.",
            });
            return;
        }

        fal.config({
            credentials: process.env.FAL_KEY,
        });

        // The model only supports these three shapes and rejects "auto" for some
        // image sizes, so we always send a supported value.
        const SUPPORTED_ASPECT_RATIOS = ["16:9", "9:16", "1:1"];
        const safeAspectRatio = SUPPORTED_ASPECT_RATIOS.includes(aspectRatio)
            ? aspectRatio
            : "16:9";

        // Send the illustration and the motion prompt to fal.ai.
        const result = await fal.subscribe("fal-ai/wan/v2.2-a14b/image-to-video/lora", {
            input: {
                image_url: image,
                prompt: prompt,
                aspect_ratio: safeAspectRatio,
                num_frames: 56,
                frames_per_second: 16
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    (update.logs ?? []).forEach((log) => console.log(log.message));
                }
            },
        });

        res.status(200).json({
            message: "Successfully generated a video",
            video: result.data.video.url,
        });
    } catch (error) {
        // Log fal's full reason to the terminal, then send the readable
        // part back so the modal can show it in the toast.
        console.error("Video generation failed:", error?.body ?? error);

        res.status(error?.status === 422 ? 422 : 500).json({
            message: getFalErrorMessage(error),
        });
    }
};

export default VideoController;
