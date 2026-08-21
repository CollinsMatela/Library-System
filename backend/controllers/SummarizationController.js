import groq from "../config/groq.js";
import FictionModel from "../models/Fiction_Model.js";

const SummarizationController = async (req, res) => {
    const { bookId, title, language, texts } = req.body;

    // Validate request
    if (!bookId || !title || !language || !Array.isArray(texts)) {
        return res.status(400).json({
            message: "BookId, Title, Texts and Language are required."
        });
    }

    try {
        // Find book
        const book = await FictionModel.findById(bookId);

        if (!book) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        // Combine all page texts
        const storyText = texts.join("\n\n");

        // Generate summary and moral
        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "user",
                    content: `
                    Summarize this children's story and provide its moral.

                    Return ONLY:
                    Summary: [80-100 words]
                    Moral: [1-2 sentences]

                    Do not explain your answer.
                    Do not add any other text.

                    Title: ${title}

                    Story:
                    ${storyText}
                    `
                }
            ]
        });

        const summaryResult = completion.choices[0].message.content;

        console.log(summaryResult)

        // Save moral/summary to database
        book.moral = summaryResult;

        await book.save();

        return res.status(200).json({
            message: "Successfully summarized the book.",
            summary: summaryResult
        });

    } catch (err) {
        console.error("SummarizationController:", err);

        if (err.status === 429) {
            return res.status(429).json({
                message: "AI service limit reached. Please try again later."
            });
        }

        return res.status(500).json({
            message: "Failed to summarize the story.",
            error: err.message
        });
    }
};

export default SummarizationController;