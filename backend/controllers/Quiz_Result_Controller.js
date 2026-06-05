import QuizResult_Model from "../models/QuizResult_Model.js";

const Quiz_Result_Controller = async (req, res) => {
      const { userId, storyId, title, score, totalQuestions, answeredQuestions } = req.body;

      try {

        const quizResult = await QuizResult_Model.create({
            userId,
            storyId,
            title,
            score,
            totalQuestions,
            answeredQuestions
        });
        
        res.status(201).json({ message: "Quiz result saved successfully", quizResult });
        
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
}
export default Quiz_Result_Controller;