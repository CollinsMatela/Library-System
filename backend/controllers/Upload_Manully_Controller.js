import Fiction_Model from "../models/Fiction_Model.js";
import NonFiction_Model from "../models/NonFiction_Model.js";

const Upload_Manually_Controller = async (req, res) => {
  const {
    type,
    category,
    field,
    title,
    author,
    description,
    language,
    publication,
    publisher,
    isbn,
    illustrator,
    moral,
    edition,
    volume,
    ddc,
    copies,
    callNumber,
    availableAt,
    pages,
    subject,
    gradeLevel,
    series,
    cover,
  } = req.body;

  try {

    console.log("Received book data:");
    console.log(req.body);

    // =========================
    // FICTION
    // =========================

    if (type?.toLowerCase() === "fiction") {

      await Fiction_Model.create({
        type,
        category,

        title,
        author,
        description,
        language,
        publication,
        publisher,
        isbn,
        illustrator,
        moral,

        series,

        copies: Number(copies),
        callNumber,
        availableAt,

        cover: cover || "",
        pages: pages || [],

        edition,
        volume,
      });

      return res.status(201).json({
        success: true,
        message: "Book uploaded successfully",
      });
    }

    // =========================
    // NON-FICTION
    // =========================

    if (type?.toLowerCase() === "non-fiction") {

      await NonFiction_Model.create({
        type,
        category,
        field,

        title,
        author,
        description,
        language,
        publication,
        publisher,
        isbn,

        ddc,

        copies: Number(copies),
        callNumber,
        availableAt,

        subject,
        gradeLevel,

        cover: cover || "",
        pages: pages || [],

        edition,
        volume,
      });

      return res.status(201).json({
        success: true,
        message: "Book uploaded successfully",
      });
    }

    // =========================
    // INVALID TYPE
    // =========================

    return res.status(400).json({
      success: false,
      message: "Invalid book type.",
    });

  } catch (error) {

    console.error("Upload book error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default Upload_Manually_Controller;