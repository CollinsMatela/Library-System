import Stories_Model from "../models/Stories_Model.js";
import cloudinary from "../config/cloudinary.js";
import { nanoid } from "nanoid";
import { createRequire } from "module";
import fs from "fs";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

const Upload_Manually_Controller = async (req, res) => {
  try {
    const { title, author, description, genre, gradeCategory } = req.body;
    console.log("-------FILES:", req.files);
    
    // IMAGE
    const imageFile = req.files?.image?.[0];

    if (!imageFile) {
      return res.status(400).json({ message: "Image required" });
    }

    const uploadedImage = await cloudinary.uploader.upload(
      `data:${imageFile.mimetype};base64,${imageFile.buffer.toString("base64")}`
    );

    const imageUrl = uploadedImage.secure_url;


    // PDF
    const pdfFile = req.files?.pdfFile?.[0];

    if (!pdfFile) {
      return res.status(400).json({ message: "PDF required" });
    }

    // SAFE BUFFER HANDLING (IMPORTANT)
    const pdfBuffer = pdfFile.buffer
      ? pdfFile.buffer
      : fs.readFileSync(pdfFile.path);

    const pdfData = await pdf(pdfBuffer);
    const extractedFullStory = pdfData.text;

    // =========================
    // QUESTIONNAIRE
    // =========================
    let questionnaire = [];

    try {
      questionnaire = JSON.parse(req.body.questionnaire || "[]");
    } catch {
      questionnaire = [];
    }

    // =========================
    // SAVE TO DB
    // =========================
    const story = await Stories_Model.create({
      id: `STORY${nanoid(10)}`,
      title,
      author,
      description,
      genre,
      gradeCategory,
      fullStory: extractedFullStory,
      summaryStory: "n/a",
      image: imageUrl,
      questionnaire: questionnaire.map((q) => ({
        question: q.question,
        choices: q.choices,
        answer: q.answer,
      })),
    });

    return res.status(200).json({
      message: "Successfully added new story",
      isSuccess: true,
      story,
    });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export default Upload_Manually_Controller;