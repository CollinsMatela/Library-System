import { useEffect, useState } from "react";
import { X, Sparkles, ImageOff, Video, Lock, Check } from "lucide-react";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

// The text we show in the prompt box by default.
// It tells the AI to animate the picture gently without changing it.
const DEFAULT_PROMPT = `Animate the existing storybook illustration with subtle, gentle movement.
Preserve the original characters, objects, colors, composition, background, clothing, and illustration style exactly as shown. Do not redesign or replace any elements.
Add only natural and subtle movements appropriate to the scene, such as gentle character movement, blinking, slight head movement, moving hair or clothing, and soft environmental movement such as swaying leaves, grass, or clouds.
Keep the animation smooth and calm, suitable for a children's storybook.
Keep the camera completely static. No camera movement, no zoom, No dramatic transitions.
Do not add new characters, objects, scenery, text, or visual elements.`;

// The video model only accepts these three shapes (never "auto"), so we pick
// one based on the illustration's shape: landscape, portrait, or square.
const SUPPORTED_ASPECT_RATIOS = ["16:9", "9:16", "1:1"];

// Look at the image's width/height and return a supported aspect ratio.
const getAspectRatio = (imageUrl) =>
    new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
            if (img.naturalWidth > img.naturalHeight) resolve("16:9");      // wide image
            else if (img.naturalHeight > img.naturalWidth) resolve("9:16"); // tall image
            else resolve("1:1");                                            // square image
        };

        // If the image can't be measured, fall back to a safe default.
        img.onerror = () => resolve("16:9");
        img.src = imageUrl;
    });

const VideoGenerationModal = ({
    onClose,
    page,
    pageNumber,
    bookTitle,
    AIVideoGeneration,
    videoGenerationLoading,
    onSaveVideo,
    videoSaveLoading,
}) => {
    // ----- State -----
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const [videoUrl, setVideoUrl] = useState("");

    // ----- Page values -----
    // The illustration we are animating, and the page text (with HTML tags removed).
    const pageImage = page?.pageImage || "";
    const plainPageText = (page?.pageText || "").replace(/<[^>]*>/g, "").trim();

    // ----- Close the modal when the user presses Escape -----
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // ----- Generate the video -----
    const handleGenerate = async () => {
        if (!pageImage) {
            toast.warning("This page has no illustration to animate.");
            return;
        }

        if (!prompt.trim()) {
            toast.warning("Please enter a motion prompt.");
            return;
        }

        try {
            // The model needs a supported aspect ratio, so we detect it from the
            // illustration. We only send the image, the prompt, and that ratio.
            const detected = await getAspectRatio(pageImage);
            const aspectRatio = SUPPORTED_ASPECT_RATIOS.includes(detected)
                ? detected
                : "16:9";

            const result = await AIVideoGeneration(pageImage, prompt.trim(), aspectRatio);
            setVideoUrl(result?.videoUrl || "");
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Failed to generate video."
            );
        }
    };

    // ----- Final approval: save the generated video -----
    const handleSave = () => {
        if (!videoUrl) return;
        onSaveVideo(videoUrl);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">

            <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-stone-200">

                {/* ================= HEADER ================= */}
                <div className="flex items-start justify-between px-6 py-5 border-b border-stone-200">

                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-stone-800">
                            <Sparkles size={16} className="text-white" />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-stone-800">
                                Video Generation
                            </h2>

                            <p className="text-xs text-stone-500 mt-1">
                                Animate this page's illustration with AI.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* ================= BODY ================= */}
                <div className="relative p-6 space-y-6">

                    {/* ---------- Preview ---------- */}
                    <div className="flex flex-col gap-3 bg-stone-50 border border-stone-200 rounded-xl p-4">

                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold text-stone-700">
                                Preview
                            </h3>

                            {pageNumber && (
                                <span className="text-[10px] bg-stone-200 text-stone-600 px-2 py-1 rounded-md">
                                    Page {pageNumber}
                                </span>
                            )}
                        </div>

                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-stone-200">

                            {pageImage ? (
                                <img
                                    src={pageImage}
                                    alt="Page illustration"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
                                    <ImageOff size={20} className="text-stone-400" />

                                    <p className="text-xs text-stone-500">
                                        No illustration on this page.
                                    </p>

                                    <p className="text-[10px] text-stone-400">
                                        Add a page image before generating a video.
                                    </p>
                                </div>
                            )}

                            {/* Show the generated video on top of the image once ready */}
                            {videoUrl && (
                                <video
                                    src={videoUrl}
                                    controls
                                    autoPlay
                                    loop
                                    muted
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            )}

                        </div>

                        <div>
                            <h4 className="text-xs font-medium text-stone-700 truncate">
                                {bookTitle || "Untitled book"}
                            </h4>

                            <div
                                className="text-[11px] leading-relaxed text-stone-500 line-clamp-3 mt-1 wrap-break-word"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(plainPageText),
                                }}
                            />
                        </div>

                    </div>

                    {/* ---------- Motion prompt ---------- */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs text-stone-600">
                                Motion Prompt <span className="text-red-500">*</span>
                            </label>

                            <button
                                type="button"
                                onClick={() => setPrompt(DEFAULT_PROMPT)}
                                disabled={videoGenerationLoading}
                                className="text-[10px] text-stone-400 hover:text-stone-600 transition cursor-pointer disabled:cursor-not-allowed"
                            >
                                Reset
                            </button>
                        </div>

                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={videoGenerationLoading}
                            placeholder="Describe how the illustration should animate..."
                            className="w-full min-h-40 resize-none rounded-xl border border-stone-300 px-3 py-2.5 text-xs leading-relaxed text-stone-700 outline-none focus:ring-2 focus:ring-stone-300 disabled:bg-stone-50"
                        />

                        <div className="flex items-center justify-between gap-4 mt-1">
                            <p className="text-[10px] text-stone-400">
                                Tip: describe gentle movement and keep the camera still.
                            </p>

                            <p className="text-[10px] text-stone-400 text-right">
                                {prompt.length} characters
                            </p>
                        </div>
                    </div>

                    {/* ---------- Info chips ---------- */}
                    <div className="flex flex-wrap gap-2">
                        <span className="flex items-center gap-1 text-[10px] text-stone-600 bg-stone-100 border border-stone-200 px-2 py-1 rounded-md">
                            <Video size={11} />
                            fal-ai/wan/v2.2-a14b/image-to-video
                        </span>

                        <span className="flex items-center gap-1 text-[10px] text-stone-600 bg-stone-100 border border-stone-200 px-2 py-1 rounded-md">
                            <Lock size={11} />
                            Static camera
                        </span>
                    </div>

                    {/* ---------- Generating overlay ---------- */}
                    {videoGenerationLoading && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-b-2xl bg-stone-950/90 backdrop-blur-sm">

                            <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/20">
                                <div className="absolute inset-0 rounded-full border border-blue-500 animate-ping opacity-30" />

                                <Sparkles size={24} className="text-white animate-pulse" />
                            </div>

                            <h1 className="text-sm font-semibold tracking-widest text-white uppercase">
                                Animating Illustration
                            </h1>

                            <p className="mt-1 text-xs text-stone-400">
                                This usually takes 30 to 60 seconds...
                            </p>

                        </div>
                    )}

                </div>

                {/* ================= FOOTER ================= */}
                <div className="flex items-center justify-between gap-2 px-6 py-4 bg-stone-50 border-t border-stone-200">

                    {pageImage ? (
                        <p className="hidden sm:block text-[10px] text-stone-400">
                            ≈ 30–60 sec · rate-limited AI request
                        </p>
                    ) : (
                        <p className="hidden sm:block text-[10px] text-amber-600">
                            No illustration available for this page.
                        </p>
                    )}

                    <div className="flex gap-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-200 rounded-xl transition"
                        >
                            Cancel
                        </button>

                        {/* Show Save only after a video has been generated */}
                        {videoUrl && (
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={videoSaveLoading}
                                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl transition cursor-pointer disabled:cursor-not-allowed bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-300"
                            >
                                <Check size={15} />

                                {videoSaveLoading ? "Saving..." : "Save Video"}
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={videoGenerationLoading || !pageImage}
                            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl transition cursor-pointer disabled:cursor-not-allowed ${
                                videoGenerationLoading
                                    ? "bg-stone-200 text-stone-500"
                                    : "bg-stone-800 text-white hover:bg-stone-900 disabled:bg-stone-300"
                            }`}
                        >
                            <Sparkles size={15} />

                            {videoGenerationLoading ? "Generating..." : "Generate Video"}
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default VideoGenerationModal;
