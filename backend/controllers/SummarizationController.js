import groq from "../config/groq.js";

const SummarizationController = async (req, res) => {
      const {title, texts} = req.body;
      
      if (!title || !texts) {
            return res.status(400).json({
                message: "Title and story text are required."
            });
        }

      try {
        const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
        {
            role: "user",
            content: `Summarize this story in 100 words using simple language for children:\n\n${title} ${texts}`,
        },
        ]
        });

        res.json({
            message: 'Successfully summarized the book.',
            summary: completion.choices[0].message.content});
    } catch (err) {
        if (err.status === 429) {
        return res.status(429).json({
            message: "AI service limit reached. Please try again later."
        });
        }
        res.status(500).json({
            message: "Failed to summarize the story.",
            error: err.message,
        });
    }
}

export default SummarizationController