import Books_Model from "../models/Books_Model.js";

const Upload_Manually_Controller = async (req, res) => {
    const {
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
        pages,
        subject,
        gradeLevel,
        series,
        cover,
        donatedFrom,
        receivedDate,
    } = req.body;

    try {
        console.log("========== RECEIVED BOOK DATA ==========");

        console.log({
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
            pages,
            subject,
            gradeLevel,
            series,
            cover,
            donatedFrom,
            receivedDate,
        });

        console.log("========================================");

        // Create book
        const book = await Books_Model.create({
            category,

            // Basic Information
            title,
            author,
            description,
            language,
            publication,
            publisher,
            isbn,

            // Literature / Fiction
            illustrator,
            moral,
            series,

            // Non-Fiction
            field,
            subject,
            gradeLevel,
            ddc,

            // Inventory
            copies: Number(copies),
            callNumber,
            donatedFrom,
            receivedDate,

            // Publication
            edition,
            volume,

            // Digital Content
            cover: cover || "",
            pages: pages || [],
        });

        console.log("Book successfully created:", book);

        return res.status(201).json({
            success: true,
            message: "Book uploaded successfully",
            book,
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

